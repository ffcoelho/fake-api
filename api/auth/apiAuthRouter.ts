import { Router } from "express";
import { apiAuthPostLogin } from "./apiAuthPostLogin";

export const apiAuthRouter = Router();

apiAuthRouter.route("/").post(apiAuthPostLogin);
