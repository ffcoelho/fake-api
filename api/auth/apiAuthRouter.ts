import { Router } from "express";
import { jsonParser } from "../../middleware/bodyParser";
import { apiPostAuthSignIn } from "./apiPostAuthSignIn";
import { apiPostAuthLogin } from "./apiPostAuthLogin";

export const apiAuthRouter = Router();

apiAuthRouter.route("/signin").post(jsonParser, apiPostAuthSignIn);
apiAuthRouter.route("/login").post(jsonParser, apiPostAuthLogin);
