import { Router } from "express";
import { apiAuthRouter } from "./auth/apiAuthRouter";

import { apiMockRouter } from "./mock/apiMockRouter";

export const routerApi = Router();

routerApi.get("/", (req, res) => {
  res.send("fake-api-helper");
});

routerApi.use("/auth", apiAuthRouter);

routerApi.use("/mock", apiMockRouter);
