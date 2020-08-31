import { Router } from "express";
import { apiPostAuthLogin } from "./apiPostAuthLogin";

export const apiAuthRouter = Router();

apiAuthRouter.route("/").post(apiPostAuthLogin);
