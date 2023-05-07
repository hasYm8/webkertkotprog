import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from "../models/user";
import { map } from 'rxjs/operators';
import { QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly collectionName = "User";

  constructor(
    private afs: AngularFirestore,
  ) { }

  getUserIdByEmail(email: string): Promise<string> {
    return this.afs
      .collection(this.collectionName, ref => ref.where('email', '==', email).limit(1))
      .get()
      .toPromise()
      .then(querySnapshot => {
        const userDoc = querySnapshot!.docs[0];
        if (userDoc) {
          return userDoc.id;
        } else {
          return "user_not_found";
        }
      });
  }

  getUserNameById(user_uid: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afs.collection(this.collectionName).doc<User>(user_uid).valueChanges().subscribe(user => {
        if (user) {
          resolve(user.displayName);
        } else {
          reject("Anonymous");
        }
      });
    });
  }

}
