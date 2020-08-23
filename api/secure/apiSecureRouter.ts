import { Router } from "express";
import { apiRequestSecure } from "./apiRequestSecure";

export const apiSecureRouter = Router();

apiSecureRouter.route("/")
  .get(apiRequestSecure)
  .post(apiRequestSecure)
  .patch(apiRequestSecure)
  .put(apiRequestSecure)
  .delete(apiRequestSecure)
  .options(apiRequestSecure);
