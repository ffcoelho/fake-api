import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import { apiAuthRouter } from "./auth/apiAuthRouter";
import { apiOpenRouter } from "./open/apiOpenRouter";
import { apiSecureRouter } from "./secure/apiSecureRouter";
import { userAuth } from "../middleware/userAuth";
import { userRole } from "../middleware/userRole";
import { swaggerDoc } from './swagger.json';

export const routerApi = Router();

routerApi.use("/auth", apiAuthRouter);
routerApi.use("/open", userRole, apiOpenRouter);
routerApi.use("/secure", userAuth, apiSecureRouter);
routerApi.use("/", swaggerUi.serve);
routerApi.get("/", swaggerUi.setup(swaggerDoc));
