import { ElementRef, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Message } from '../models/message';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: Message[] = [];
  readonly collectionName = "Message";

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private auth: AuthService,
  ) { }

  addNewMessage(receiver_uid: string, message: string, messageArea: ElementRef) {
    this.auth.getLoggedInUserId().then((sender_uid) => {
      let tempMessage: Message = {
        sender_uid: sender_uid,
        receiver_uid: receiver_uid,
        text: message,
        time: Timestamp.now()
      }

      this.afs.collection<Message>(this.collectionName).add(tempMessage).then(() => {
        this.getAllMessages(receiver_uid, messageArea);
      });
    });
  }

  getAllMessages(friend_uid: string, messageArea: ElementRef) {
    let tempMessages: Message[] = [];

    this.auth.getLoggedInUserId().then((me_uid) => {

      this.afs.collection<Message>(this.collectionName, ref =>
        ref.where('receiver_uid', '==', me_uid)
          .where('sender_uid', '==', friend_uid)).valueChanges().subscribe((messages: Message[]) => {
            tempMessages = messages;


            this.afs.collection<Message>(this.collectionName, ref => ref.where('receiver_uid', '==', friend_uid).where('sender_uid', '==', me_uid)).get().toPromise().then((querySnapshot) => {
              const messages2 = querySnapshot?.docs.map(doc => doc.data()) as Message[];
              this.messages = tempMessages.concat(messages2);
              this.messages.sort((a, b) => a.time.toMillis() - b.time.toMillis());

              messageArea.nativeElement.scrollTop = messageArea.nativeElement.scrollHeight;
            });

          });
    });
  }


  /*
getAllMessages(friend_uid: string) {
  this.auth.getLoggedInUserId().then((me_uid) => {

    const query1$ = this.afs.collection<Message>(this.collectionName, ref =>
      ref.where('receiver_uid', '==', me_uid)
        .where('sender_uid', '==', friend_uid)).valueChanges().pipe(take(1));

    const query2$ = this.afs.collection<Message>(this.collectionName, ref => ref.where('receiver_uid', '==', friend_uid).where('sender_uid', '==', me_uid)).valueChanges().pipe(take(1));

    forkJoin([query1$, query2$]).subscribe(([messages1, messages2]) => {
      this.messages = messages1.concat(messages2);
      this.messages.sort((a, b) => a.time.toMillis() - b.time.toMillis());
      console.log(this.messages);
      
    });
  });
}
*/


}
