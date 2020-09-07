import { Router } from "express";
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import { jsonParser } from "../middleware/bodyParser";
import { userRole } from "../middleware/userRole";
import { fakeApi } from "../middleware/fakeApi";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiFileRouter } from "./file/apiFileRouter";
import { apiMocksRouter } from "./mocks/apiMocksRouter";
import { swaggerDoc } from './swagger.json';

const swaggerOpts: SwaggerUiOptions = {
  customSiteTitle: "Fake API Helper",
  swaggerOptions: {
    supportedSubmitMethods: [],
    docExpansion: "none"
  }
};

export const routerApi = Router();

routerApi.use("/auth", jsonParser, fakeApi, apiAuthRouter);
routerApi.use("/file", jsonParser, userRole, fakeApi, apiFileRouter);
routerApi.use("/mocks", jsonParser, userRole, fakeApi, apiMocksRouter);
routerApi.use("/", swaggerUi.serve);
routerApi.get("/", swaggerUi.setup(swaggerDoc, swaggerOpts));
