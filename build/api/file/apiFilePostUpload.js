"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeApi_model_1 = require("../../model/fakeApi.model");
const File = require("../../data/dbFile");
exports.apiFilePostUpload = async (req, res, next) => {
    try {
        if (!req.uploadedFile) {
            throw new Error();
        }
        const uploadedFile = {
            id: "",
            fileName: req.uploadedFile.fileName,
            fileType: req.uploadedFile.fileType,
            fileSize: req.uploadedFile.fileSize,
            key: req.uploadedFile.key,
            expires: req.uploadedFile.dateTime + 3600000
        };
        const file = new File(uploadedFile);
        await file.generateId();
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.FILE, file);
        apiRes.obj.role = req.role || "default";
        apiRes.obj.auth = apiRes.obj.role !== "default";
        res.status(200).json(apiRes.obj);
    }
    catch (err) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
        return res.status(400).json(apiRes.obj);
    }
};
