import { Router } from "express";
import { jsonParser } from "../../middleware/bodyParser";
import { apiPostAuthSignIn } from "./apiPostAuthSignIn";

export const apiAuthRouter = Router();

apiAuthRouter.route("/signin").post(jsonParser, apiPostAuthSignIn);
