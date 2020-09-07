import { UserRequestHandler } from "../../model/express.model";
import { FileModel, FileResponseModel } from "../../model/file.model";

const File = require("../../data/dbFile");

export const apiFilePostUpload: UserRequestHandler = async (req, res, next) => {
  if (req.fakeApiError) {
    return res.status(req.fakeApiError.status).json({ role: req.role, error: req.fakeApiError.message });
  }
  if (!req.uploadedFile) {
    return res.status(400).json({ error: "FakeApiHelper: error" });
  }
  try {
    const uploadedFile: FileModel = {
      id: "",
      fileName: req.uploadedFile.fileName,
      fileType: req.uploadedFile.fileType,
      key: req.uploadedFile.key,
      expires: req.uploadedFile.dateTime + 3600000
    };
    const file = new File(uploadedFile);
    await file.generateId();
    await file.save();
    const resObj: FileResponseModel = {
      id: file.id,
      fileName: req.uploadedFile.fileName,
      fileSize: req.uploadedFile.fileSize,
      url: `http://localhost:9000/open/download/${file.id}`
    };
    res.status(201).json(resObj);
  } catch (err) {
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
};
