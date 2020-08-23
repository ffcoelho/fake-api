import { Router } from "express";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { usersRouter } from "./users/apiUsers";

export const routerApi = Router();

routerApi.get("/", (req, res) => {
  res.send("fake-api-helper");
});

routerApi.use("/auth", apiAuthRouter);
routerApi.use("/users", usersRouter);
