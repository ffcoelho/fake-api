"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const fakeApi_model_1 = require("../model/fakeApi.model");
exports.fileUploader = async (req, res, next) => {
    try {
        const postFile = request_1.default.post(process.env.API_UPLOAD_URL || "http://localhost:3000/", function (err, resp, body) {
            if (err) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
                return res.status(400).json(apiRes.obj);
            }
            else {
                const apiResp = JSON.parse(body);
                req.uploadedFile = {
                    key: apiResp.key,
                    fileName: req.file.originalname,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size,
                    dateTime: new Date().getTime()
                };
                next();
            }
        });
        const form = postFile.form();
        form.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });
    }
    catch (err) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: upload error");
        return res.status(400).json(apiRes.obj);
    }
};
