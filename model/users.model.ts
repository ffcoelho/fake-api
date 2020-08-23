import { Document } from "mongoose";

export interface UserModel {
  role: string;
  token: string;
}

export interface UserDocModel extends Document {
  role: string;
  password: string;
  token: string;
}
