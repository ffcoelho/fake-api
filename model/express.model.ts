import { Request, Response, NextFunction } from "express";
import { FakeApiErrorModel } from "./http.model";
import { UploadedFileModel } from "./file.model";

export interface UserRequest extends Request {
  role?: string;
  fakeApiError?: FakeApiErrorModel;
  uploadedFile?: UploadedFileModel;
}

export type UserRequestHandler = (req: UserRequest, res: Response, next: NextFunction) => any;
