import { Document } from "mongoose";

export interface TokenModel {
  id: string;
  role: string;
}

export interface UserModel {
  id: string;
  role: string;
  username: string;
  name: string;
  email: string;
  photoUrl: string;
  password: string;
  token: string;
}

export interface UserDocModel extends Document {
  id: string;
  role: string;
  username: string;
  name: string;
  email: string;
  photoUrl: string;
  password: string;
  token: string;
}
