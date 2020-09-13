"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeApi_model_1 = require("../model/fakeApi.model");
exports.fakeStatusHandler = async (req, res, next) => {
    try {
        const { fakeStatus } = req.body;
        if (!fakeStatus) {
            return next();
        }
        if (fakeStatus.code) {
            const validError = new fakeApi_model_1.FakeErrorValidator().validError(fakeStatus.code);
            if (!validError) {
                const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid status code");
                return res.status(400).json(apiRes.obj);
            }
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, fakeStatus.message || "");
            return res.status(fakeStatus.code).json(apiRes.obj);
        }
        next();
    }
    catch (err) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        return res.status(400).json(apiRes.obj);
    }
};
