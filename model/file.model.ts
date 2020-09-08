import { Document } from "mongoose";

export interface UploadedFileModel {
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  dateTime: number;
}

export interface FileModel {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  key: string;
  expires: number;
}

export interface FileDocModel extends Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  key: string;
  expires: number;
}
