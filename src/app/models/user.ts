import { Timestamp } from "@angular/fire/firestore";

export interface User {
    email: string;
    displayName: string;
}

export interface AuthUser extends User{
    password: string;
}

export interface FriendShip {
    user1_uid: string;
    user2_uid: string;
    since: Timestamp;
}

export interface Friend {
    user_uid: string;
    friendShipId: string;
    displayName: string;
    since: Timestamp;
}