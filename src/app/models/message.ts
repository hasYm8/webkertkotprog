import { Timestamp } from "@angular/fire/firestore";

export interface Message {
    sender_uid: string;
    receiver_uid: string;
    text: string;
    time: Timestamp;
}