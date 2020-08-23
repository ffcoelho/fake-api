import { Router } from "express";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiOpenRouter } from "./open/apiOpenRouter";
import { apiSecureRouter } from "./secure/apiSecureRouter";
import { userAuth } from "../middleware/userAuth";
import { userRole } from "../middleware/userRole";

import { apiMockRouter } from "./mock/apiMockRouter";

export const routerApi = Router();

routerApi.get("/", (req, res) => {
  res.send("fake-api-helper");
});

routerApi.use("/auth", apiAuthRouter);
routerApi.use("/open", userRole, apiOpenRouter);
routerApi.use("/secure", userAuth, apiSecureRouter);

routerApi.use("/mock", apiMockRouter);
