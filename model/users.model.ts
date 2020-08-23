import { Document } from "mongoose";

export interface UserModel {
  id: string;
  role: string;
  username: string;
}

export interface UserDocModel extends Document {
  id: string;
  role: string;
  username: string;
  password: string;
  token: string;
}
