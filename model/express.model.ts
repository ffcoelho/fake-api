import { Request, Response, NextFunction } from "express";
import { FakeApiHelperModel } from "./http.model";
import { UploadedFileModel } from "./file.model";

export interface UserRequest extends Request {
  role?: string;
  fakeApi?: FakeApiHelperModel;
  uploadedFile?: UploadedFileModel;
}

export type UserRequestHandler = (req: UserRequest, res: Response, next: NextFunction) => any;
