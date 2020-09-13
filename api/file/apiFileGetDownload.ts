import request from "request";
import { UserRequestHandler } from "../../model/express.model";
import { FileDocModel } from "../../model/file.model";
import { FakeApiResponse, FakeApiResponseType } from "../../model/fakeApi.model";

const File = require("../../data/dbFile");

export const apiFileGetDownload: UserRequestHandler = async (req, res, next) => {
  try {
    if (!req.params.id) {
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid file id");
      return res.status(400).json(apiRes.obj);
    }
    const file: FileDocModel = await File.findById(req.params.id);
    if (new Date().getTime() > file.expires) {
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid file id");
      return res.status(400).json(apiRes.obj);
    }
    request.get({ url: `${process.env.STORAGE_API_DOWNLOAD_URL || "http://localhost:3000/"}${file.key}`, encoding: null }, async (err, resp, body) => {
      if (err) {
        throw new Error();
      }
      await File.deleteById(req.params.id);
      res.attachment(file.fileName).contentType(file.fileType).send(body);
    });
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: download error");
    return res.status(400).json(apiRes.obj);
  }
};
