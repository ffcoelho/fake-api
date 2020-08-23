import { Router } from "express";
import { jsonParser } from "../../middleware/bodyParser";
import { apiPostMockUser } from "./apiPostMockUser";

export const apiMockRouter = Router();

apiMockRouter.route("/user").post(jsonParser, apiPostMockUser);
