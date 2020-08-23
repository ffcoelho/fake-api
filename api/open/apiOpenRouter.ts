import { Router } from "express";
import { apiRequestOpen } from "./apiRequestOpen";

export const apiOpenRouter = Router();

apiOpenRouter.route("/")
  .get(apiRequestOpen)
  .post(apiRequestOpen)
  .patch(apiRequestOpen)
  .put(apiRequestOpen)
  .delete(apiRequestOpen)
  .options(apiRequestOpen);
