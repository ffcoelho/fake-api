"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const fakeApi_model_1 = require("../../model/fakeApi.model");
const File = require("../../data/dbFile");
exports.apiFileGetDownload = async (req, res, next) => {
    try {
        if (!req.params.id) {
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid file id");
            return res.status(400).json(apiRes.obj);
        }
        const file = await File.findById(req.params.id);
        if (new Date().getTime() > file.expires) {
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid file id");
            return res.status(400).json(apiRes.obj);
        }
        request_1.default.get({ url: `${process.env.API_DOWNLOAD_URL || "http://localhost:3000/"}${file.key}`, encoding: null }, async (err, resp, body) => {
            if (err) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: download error");
                return res.status(400).json(apiRes.obj);
            }
            await File.deleteById(req.params.id);
            res.attachment(file.fileName).contentType(file.fileType).send(body);
        });
    }
    catch (err) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: download error");
        return res.status(400).json(apiRes.obj);
    }
};
