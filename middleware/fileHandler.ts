import multer from "multer";
import { UserRequestHandler } from "../model/express.model";

const memStorage = multer.memoryStorage();
const upload = multer({ storage: memStorage, limits: { fileSize: 300000 } }).single("file");

export const fileHandler: UserRequestHandler = async (req, res, next) => {
  try {
    upload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "FakeApiHelper: error", err });
      } else if (err) {
        return res.status(400).json({ error: "FakeApiHelper: error", err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "FakeApiHelper: error" });
      }
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
}

