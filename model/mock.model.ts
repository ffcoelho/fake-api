import { Document } from "mongoose";

export interface MockModel {
  type: string;
  data: any[];
}

export interface MockDocModel extends Document {
  type: string;
  data: any[];
}
