import { Document } from "mongoose";

export interface UserModel {
  role: string;
  token: string;
}

export interface UserDocModel extends Document {
  id: string;
  role: string;
  password: string;
  token: string;
}
