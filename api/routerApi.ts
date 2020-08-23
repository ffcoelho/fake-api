import { Router } from "express";

export const routerApi = Router();

routerApi.get("/", (req, res) => {
  res.send("fake-api-helper");
});
