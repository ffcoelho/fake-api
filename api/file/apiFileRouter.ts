import { Router } from "express";
import { urlEncodedParser } from "../../middleware/bodyParser";
import { fileHandler } from "../../middleware/fileHandler";
import { fileUploader } from "../../middleware/fileUploader";
import { apiFileGetDownload } from "./apiFileGetDownload";
import { apiFilePostUpload } from "./apiFilePostUpload";

export const apiFileRouter = Router();

apiFileRouter.route("/download/:id").get(urlEncodedParser, apiFileGetDownload);
apiFileRouter.route("/upload").post(fileHandler, fileUploader, apiFilePostUpload);
