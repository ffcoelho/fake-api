import { Router } from "express";
import { jsonParser } from "../../middleware/bodyParser";
import { apiPostAuthLogin } from "./apiPostAuthLogin";

export const apiAuthRouter = Router();

apiAuthRouter.route("/").post(jsonParser, apiPostAuthLogin);
