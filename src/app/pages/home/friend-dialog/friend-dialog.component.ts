import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/user';
import { FriendService } from "../../../services/friend.service";

@Component({
  selector: 'app-friend-dialog',
  templateUrl: './friend-dialog.component.html',
  styleUrls: ['./friend-dialog.component.scss']
})
export class FriendDialogComponent implements OnInit {
  email?: string;

  constructor(
    public friendService: FriendService,
  ) { }

  ngOnInit(): void {
    this.friendService.getAllFriends();
  }

  add_friend() {
    if (this.email !== undefined && this.email !== null && this.email !== "") {
      this.friendService.addNewFriend(this.email);
    }
  }

  deleteFriend(friend: Friend) {
    this.friendService.deleteFriendShip(friend.friendShipId);
  }

}
