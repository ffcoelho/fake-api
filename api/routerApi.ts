import { Router } from "express";
import { jsonParser } from "../middleware/bodyParser";
import { fakeStatusHandler } from "../middleware/fakeStatusHandler";
import { userRole } from "../middleware/userRole";
import { apiGetDocs } from "./apiGetDocs";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiFileRouter } from "./file/apiFileRouter";
import { apiMockRouter } from "./mock/apiMockRouter";

export const routerApi = Router();

routerApi.use("/auth", jsonParser, fakeStatusHandler, apiAuthRouter);
routerApi.use("/file", jsonParser, userRole, fakeStatusHandler, apiFileRouter);
routerApi.use("/mock", jsonParser, userRole, fakeStatusHandler, apiMockRouter);
routerApi.use("/", apiGetDocs);
