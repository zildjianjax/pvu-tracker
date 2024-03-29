import firebase from "firebase";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";

export interface UserData {
  user: firebase.User | null | undefined;
  username?: string | null;
}

export interface CommonCollection<T> {
  [key: string]: T | Common;
}
export interface Common
  extends Data<firebase.firestore.DocumentData, "id", ""> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Land extends Common {
  address: string;
  x: number;
  y: number;
}
export interface Account extends Common {
  address: string;
}
export interface Plant extends Common {
  landId: string;
  userId: string;
  page: number;
  element: string;
  card: number;
  readableId: string;
  resetTime: Date;
  differenceToNextTime: Date | string;
  hasRecentlyPassed: boolean;
  isFiveMinutesRemaining: boolean;
  isThirthyMinutesRemaing: boolean;
  timeRemaining: number;
  hoursDiff: number;
  minutesDiff: number;
  secondsDiff: number;
  locked: boolean;
  moveToNextDay: boolean;
}
