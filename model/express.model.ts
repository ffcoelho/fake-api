import { Request, Response, NextFunction } from "express";

export interface UserRequest extends Request {
  role?: string;
}

export type UserRequestHandler = (req: UserRequest, res: Response, next: NextFunction) => any;
