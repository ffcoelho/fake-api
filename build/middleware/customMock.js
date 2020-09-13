"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const cheerio_1 = __importDefault(require("cheerio"));
const fakeApi_model_1 = require("../model/fakeApi.model");
exports.customMock = async (req, res, next) => {
    try {
        if (!req.params.type) {
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
            return res.status(400).json(apiRes.obj);
        }
        if (!req.query.path) {
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: no path provided");
            return res.status(400).json(apiRes.obj);
        }
        if (req.params.type !== "custom") {
            return next();
        }
        request_1.default.get({ url: `http://dontpad.com/${req.query.path}` }, (error, response, body) => {
            if (error) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid folder");
                return res.status(400).json(apiRes.obj);
            }
            try {
                const $ = cheerio_1.default.load(body);
                const result = $("#text").text();
                const resultObj = JSON.parse(result);
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.MOCK, resultObj);
                return res.json(apiRes.obj);
            }
            catch (error) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid folder content");
                return res.status(400).json(apiRes.obj);
            }
        });
    }
    catch (err) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        return res.status(400).json(apiRes.obj);
    }
};
