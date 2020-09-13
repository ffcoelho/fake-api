import { Router } from "express";
import { urlEncodedParser } from "../../middleware/bodyParser";
import { customMock } from "../../middleware/customMock";
import { apiMockGetType } from "./apiMockGetType";

export const apiMockRouter = Router();

apiMockRouter.route("/:type").get(urlEncodedParser, customMock, apiMockGetType);
