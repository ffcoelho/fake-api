import { Document } from "mongoose";
import multer from "multer";
import { UserRequestHandler } from "./express.model";

export interface UploadedFileModel {
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  dateTime: number;
}

export interface FileResponseModel {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
}

export interface FileModel {
  id: string;
  fileName: string;
  fileType: string;
  key: string;
  expires: number;
}

export interface FileDocModel extends Document {
  id: string;
  fileName: string;
  fileType: string;
  key: string;
  expires: number;
}
