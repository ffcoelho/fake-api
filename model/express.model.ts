import { Request, Response, NextFunction } from "express";
import { FakeApiErrorModel } from "./http.model";

export interface UserRequest extends Request {
  role?: string;
  fakeApiError?: FakeApiErrorModel;
}

export type UserRequestHandler = (req: UserRequest, res: Response, next: NextFunction) => any;
