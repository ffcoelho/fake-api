import { UserRequestHandler } from "../../model/express.model";
import { FileModel } from "../../model/file.model";
import { FakeApiResponse, FakeApiResponseType } from "../../model/fakeApi.model";

const File = require("../../data/dbFile");

export const apiFilePostUpload: UserRequestHandler = async (req, res, next) => {
  try {
    if (!req.uploadedFile) {
      throw new Error();
    }
    const uploadedFile: FileModel = {
      id: "",
      fileName: req.uploadedFile.fileName,
      fileType: req.uploadedFile.fileType,
      fileSize: req.uploadedFile.fileSize,
      key: req.uploadedFile.key,
      expires: req.uploadedFile.dateTime + 3600000
    };
    const file = new File(uploadedFile);
    await file.generateId();
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.FILE, file);
    apiRes.obj.role = req.role || "default";
    apiRes.obj.auth = apiRes.obj.role !== "default";
    res.status(201).json(apiRes.obj);
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "Something went wrong");
    return res.status(400).json(apiRes.obj);
  }
};
