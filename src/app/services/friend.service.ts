import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Friend, FriendShip } from '../models/user';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  public friends: Friend[] = [];
  readonly collectionName = "Friend";

  constructor(
    private afs: AngularFirestore,
    public userService: UserService,
    private auth: AuthService,
  ) { }

  async areUsersFriends(user1_uid: string, user2_uid: string): Promise<boolean> {
    const friendRef = this.afs.collection(this.collectionName, ref => ref
      .where('user1_uid', 'in', [user1_uid, user2_uid])
      .where('user2_uid', 'in', [user1_uid, user2_uid])
    );

    const friendsSnapshot = await friendRef.get().toPromise();

    return friendsSnapshot!.docs.length > 0;
  }

  addNewFriend(email: string) {
    let friendShip: FriendShip;

    Promise.all([
      this.auth.getLoggedInUserId(),
      this.userService.getUserIdByEmail(email),
    ]).then((values) => {
      this.areUsersFriends(values[0], values[1]).then((areFriends) => {
        if (values[0] === values[1]) { // cant add yourself to friend
          return;
        }

        if (values[1] === "user_not_found") { // email does not exist
          return;
        }

        if (areFriends) { // they are friends at the moment
          return;
        } else {
          friendShip = {
            user1_uid: values[0],
            user2_uid: values[1],
            since: Timestamp.now()
          }

          this.afs.collection<FriendShip>(this.collectionName).doc().set(friendShip).then((value) => {
            this.getAllFriends();
          })
        }
      });
    });
  }

  getAllFriends() {
    let tempFriends: Friend[] = [];

    this.auth.getLoggedInUserId().then((id) => {
      this.afs
        .collection<FriendShip>(this.collectionName, (ref) => ref.where('user1_uid', '==', id))
        .snapshotChanges().pipe(take(1))
        .subscribe((friendShipChanges) => {
          for (let friendShipChange of friendShipChanges) {
            let friendShip = friendShipChange.payload.doc.data() as FriendShip;
            let friendShipId = friendShipChange.payload.doc.id;
            this.userService.getUserNameById(friendShip.user2_uid).then((displayName) => {
              let friend: Friend = {
                user_uid: friendShip.user2_uid,
                displayName: displayName,
                friendShipId: friendShipId,
                since: friendShip.since
              }
              
              tempFriends.push(friend);
            });
          }

          this.afs
            .collection<FriendShip>(this.collectionName, (ref) => ref.where('user2_uid', '==', id))
            .snapshotChanges().pipe(take(1))
            .subscribe((friendShipChanges) => {
              for (let friendShipChange of friendShipChanges) {
                let friendShip = friendShipChange.payload.doc.data() as FriendShip;
                let friendShipId = friendShipChange.payload.doc.id;
                this.userService.getUserNameById(friendShip.user1_uid).then((displayName) => {
                  let friend: Friend = {
                    user_uid: friendShip.user1_uid,
                    displayName: displayName,
                    friendShipId: friendShipId,
                    since: friendShip.since
                  }
                  tempFriends.push(friend);
                });
              }

              this.friends = tempFriends;
            });

        });
    });
  }

  deleteFriendShip(friendShipId: string) {
    this.afs.collection<FriendShip>(this.collectionName).doc(friendShipId).delete().then((value) => {
      this.getAllFriends();
    });
  }

}
