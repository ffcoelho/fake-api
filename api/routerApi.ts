import { Router } from "express";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiSecureRouter } from "./secure/apiSecureRouter";
import { userAuth } from "../middleware/userAuth";

import { apiMockRouter } from "./mock/apiMockRouter";

export const routerApi = Router();

routerApi.get("/", (req, res) => {
  res.send("fake-api-helper");
});

routerApi.use("/auth", apiAuthRouter);
routerApi.use("/secure", userAuth, apiSecureRouter);

routerApi.use("/mock", apiMockRouter);
