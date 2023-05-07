import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
  host: { '(click)': 'chooseFriend()'}
})
export class FriendComponent implements OnInit {

  @Input() displayName: any;
  @Input() user_uid: any;
  @Output() changeChosenFriend: any = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  chooseFriend() {
    this.changeChosenFriend.emit(this.user_uid);
  }

}
