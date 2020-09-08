import { Router } from "express";
import { jsonParser } from "../../middleware/bodyParser";
import { apiMockHelper } from "./apiMockHelper";

export const apiMockRouter = Router();

apiMockRouter.route("/").post(jsonParser, apiMockHelper);

// apiMocksRouter.route("/")
  // .get(apiRequestOpen)
  // .post(apiRequestOpen)
  // .patch(apiRequestOpen)
  // .put(apiRequestOpen)
  // .delete(apiRequestOpen)
  // .options(apiRequestOpen);
