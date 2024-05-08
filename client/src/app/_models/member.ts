import { Photo } from "./photo";

export interface Member {
  id: number;
  userName: string;
  nickName: string;
  mainPhotoUrl: string;
  age: number;
  created: string;
  lastActive: string;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}
