import request from "request";
import { UserRequestHandler } from "../../model/express.model";
import { FileDocModel } from "../../model/file.model";

const File = require("../../data/dbFile");

export const apiFileGetDownload: UserRequestHandler = async (req, res, next) => {
  if (req.fakeApiError) {
    return res.status(req.fakeApiError.status).json({ role: req.role, error: req.fakeApiError.message });
  }
  if (!req.params.id) {
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
  try {
    const file: FileDocModel = await File.findById(req.params.id);
    request.get({ url: `${process.env.STORAGEAPI || "http://localhost:3000/"}${file.key}`, encoding: null }, async (err, resp, body) => {
      if (err) { return console.log(err); }
      await File.deleteById(req.params.id);
      res.attachment(file.fileName).contentType(file.fileType).send(body);
    });
  } catch (err) {
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
};
