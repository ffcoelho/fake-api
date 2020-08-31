import { Router } from "express";
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import { jsonParser } from "../middleware/bodyParser";
import { userAuth } from "../middleware/userAuth";
import { userRole } from "../middleware/userRole";
import { fakeApi } from "../middleware/fakeApi";
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiOpenRouter } from "./open/apiOpenRouter";
import { apiSecureRouter } from "./secure/apiSecureRouter";
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
routerApi.use("/open", jsonParser, userRole, fakeApi, apiOpenRouter);
routerApi.use("/secure", jsonParser, userAuth, fakeApi, apiSecureRouter);
routerApi.use("/", swaggerUi.serve);
routerApi.get("/", swaggerUi.setup(swaggerDoc, swaggerOpts));
