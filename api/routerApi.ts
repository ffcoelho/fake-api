import { Router } from "express";
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import { jsonParser } from "../middleware/bodyParser";
import { fakeStatusHandler } from "../middleware/fakeStatusHandler";
import { userRole } from "../middleware/userRole";
import { apiGetDocs } from "./apiGetDocs";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiFileRouter } from "./file/apiFileRouter";
import { apiMockRouter } from "./mock/apiMockRouter";
import { swaggerDoc } from './swagger.json';

const swaggerOpts: SwaggerUiOptions = {
  customSiteTitle: "Fake API Helper",
  swaggerOptions: {
    supportedSubmitMethods: [],
    docExpansion: "none"
  }
};

export const routerApi = Router();

routerApi.use("/auth", jsonParser, fakeStatusHandler, apiAuthRouter);
routerApi.use("/file", jsonParser, userRole, fakeStatusHandler, apiFileRouter);
routerApi.use("/mock", jsonParser, userRole, fakeStatusHandler, apiMockRouter);
routerApi.use("/", apiGetDocs);
routerApi.use("/swagger", swaggerUi.serve);
routerApi.get("/swagger", swaggerUi.setup(swaggerDoc, swaggerOpts));
