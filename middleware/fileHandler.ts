import multer from "multer";
import { UserRequestHandler } from "../model/express.model";
import { FakeApiResponse, FakeApiResponseType } from "../model/fakeApi.model";

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage, limits: { fileSize: 307200 } }).single("file");

export const fileHandler: UserRequestHandler = async (req, res, next) => {
  try {
    upload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: file size exceeded");
          return res.status(400).json(apiRes.obj);
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: multiple files not allowed");
          return res.status(400).json(apiRes.obj);
        }
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        return res.status(400).json(apiRes.obj);
      } else if (err) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
        return res.status(400).json(apiRes.obj);
      }
      if (!req.file) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: no file provided");
        return res.status(400).json(apiRes.obj);
      }
      next();
    });
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
    return res.status(400).json(apiRes.obj);
  }
}

