import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FriendService } from 'src/app/services/friend.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import {MatSelectModule} from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { FriendChooserDialogComponent } from './friend-chooser-dialog/friend-chooser-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  public chosenFriendUser_uid: string = '';
  public chosenFriendDisplayName: string = '';
  public message: string = '';

  private messageAreaDiv = document.getElementById('message-area-messages');

  @ViewChild('messageArea') messageArea!: ElementRef;

  constructor(
    private auth: AuthService,
    public friendService: FriendService,
    private userService: UserService,
    public messageService: MessageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.friendService.getAllFriends();
  }

  ngAfterViewChecked(): void {
    if (this.messageArea != undefined) {
      this.messageArea.nativeElement!.scrollTop = this.messageArea.nativeElement!.scrollHeight;
    }
  }

  async changeChosenFriend(user_uid: string) {
    this.messageService.messages = [];
    this.chosenFriendUser_uid = user_uid;
    this.chosenFriendDisplayName = await this.userService.getUserNameById(user_uid);
    this.messageService.getAllMessages(this.chosenFriendUser_uid, this.messageArea);
  }

  sendMessage() {
    if (this.message !== '') {
      this.messageService.addNewMessage(this.chosenFriendUser_uid, this.message, this.messageArea);
    }
    
    this.message = '';
  }

  open_friend_chooser_controller() {
    const dialogRef = this.dialog.open(FriendChooserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.changeChosenFriend(result);
      }
    });
  }

}
