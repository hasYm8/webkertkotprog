import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { BehaviorSubject, from, switchMap, of } from 'rxjs';
import { AuthUser, User } from '../models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);
  readonly isLoggedIn$ = authState(this.auth);
  readonly collectionName = "User";

  constructor(
    private auth: Auth,
    private afs: AngularFirestore
  ) { }

  signIn({ email, password }: AuthUser) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => {
        return of(user);
      })
    );
  }

  signUp({ email, password, displayName }: AuthUser) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => {
        const data = {
          email: email,
          displayName: displayName,
        };
        this.afs.collection<User>(this.collectionName).doc(user.uid).set(data);
        return of(user);
      })
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }

  getLoggedInUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.isLoggedIn$.subscribe(
        user => {
          if (user) {
            resolve(user.uid);
          } else {
          }
        }
      );
    });
  }

}
