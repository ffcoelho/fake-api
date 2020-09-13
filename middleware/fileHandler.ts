import multer from "multer";
import { UserRequestHandler } from "../model/express.model";
import { FakeApiResponse, FakeApiResponseType } from "../model/fakeApi.model";

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage, limits: { fileSize: 307200 } }).single("file");

export const fileHandler: UserRequestHandler = async (req, res, next) => {
  try {
    upload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        // return res.status(400).json(apiRes.obj);
        return res.status(400).json(err);
      } else if (err) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        // return res.status(400).json(apiRes.obj);
        return res.status(400).json(err);
      }
      if (!req.file) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: no file");
        return res.status(400).json(apiRes.obj);
      }
      next();
    });
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
    return res.status(400).json(apiRes.obj);
  }
}

