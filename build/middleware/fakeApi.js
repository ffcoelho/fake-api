"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_model_1 = require("../model/http.model");
exports.fakeApi = async (req, res, next) => {
    try {
        const { fakeApi } = req.body;
        if (!fakeApi) {
            return next();
        }
        const validError = new http_model_1.HttpErrorValidator().validError(fakeApi.errStatus);
        if (!validError) {
            return next();
        }
        req.fakeApiError = { status: fakeApi.errStatus, message: fakeApi.errMessage };
        next();
    }
    catch (err) {
        next();
    }
};
