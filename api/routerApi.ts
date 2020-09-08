import { Router } from "express";
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import { jsonParser } from "../middleware/bodyParser";
import { fakeErrorHandler } from "../middleware/fakeErrorHandler";
import { userRole } from "../middleware/userRole";
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

routerApi.use("/auth", jsonParser, fakeErrorHandler, apiAuthRouter);
routerApi.use("/file", jsonParser, userRole, fakeErrorHandler, apiFileRouter);
routerApi.use("/mock", jsonParser, userRole, fakeErrorHandler, apiMockRouter);
routerApi.use("/", swaggerUi.serve);
routerApi.get("/", swaggerUi.setup(swaggerDoc, swaggerOpts));
