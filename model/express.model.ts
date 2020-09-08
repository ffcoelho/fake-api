import { Request, Response, NextFunction } from "express";
import { UploadedFileModel } from "./file.model";

export interface UserRequest extends Request {
  role?: string;
  uploadedFile?: UploadedFileModel;
}

export type UserRequestHandler = (req: UserRequest, res: Response, next: NextFunction) => any;
