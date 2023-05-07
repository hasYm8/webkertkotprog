import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friend-chooser-dialog',
  templateUrl: './friend-chooser-dialog.component.html',
  styleUrls: ['./friend-chooser-dialog.component.scss']
})
export class FriendChooserDialogComponent implements OnInit {

  public selectedFriend_uid: any;

  constructor(
    public friendService: FriendService,
    public dialogRef: MatDialogRef<FriendChooserDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
