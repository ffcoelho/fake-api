"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fakeApi_model_1 = require("../model/fakeApi.model");
const memStorage = multer_1.default.memoryStorage();
const upload = multer_1.default({ storage: memStorage, limits: { fileSize: 307200 } }).single("file");
exports.fileHandler = async (req, res, next) => {
    try {
        upload(req, res, function (err) {
            if (err instanceof multer_1.default.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: file size exceeded");
                    return res.status(400).json(apiRes.obj);
                }
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: multiple files not allowed");
                    return res.status(400).json(apiRes.obj);
                }
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
                return res.status(400).json(apiRes.obj);
            }
            else if (err) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
                return res.status(400).json(apiRes.obj);
            }
            if (!req.file) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: no file provided");
                return res.status(400).json(apiRes.obj);
            }
            next();
        });
    }
    catch (err) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
        return res.status(400).json(apiRes.obj);
    }
};
