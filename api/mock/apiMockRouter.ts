import { Router } from "express";
import { urlEncodedParser } from "../../middleware/bodyParser";
import { apiMockGetType } from "./apiMockGetType";
import { apiMockHelper } from "./apiMockHelper";

export const apiMockRouter = Router();

apiMockRouter.route("/").post(apiMockHelper);
apiMockRouter.route("/:type").get(urlEncodedParser, apiMockGetType);
