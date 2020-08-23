import { Router } from "express";
import { jsonParser } from "../../middleware/bodyParser";
import { apiPostUserSignIn } from "./apiPostUserSignIn";

export const usersRouter = Router();

usersRouter.route("/signin").post(jsonParser, apiPostUserSignIn);
