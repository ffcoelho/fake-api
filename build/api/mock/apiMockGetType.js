"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeApi_model_1 = require("../../model/fakeApi.model");
const Mock = require("../../data/dbMock");
exports.apiMockGetType = async (req, res, next) => {
    try {
        const type = req.params.type;
        let page = req.query.page || 1;
        let count = req.query.count || 10;
        const mock = await Mock.findByType(type);
        const data = new fakeApi_model_1.FakeResponsePagination(mock.data, type, parseInt(page), parseInt(count));
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.MOCK, data);
        apiRes.obj.role = req.role || "default";
        apiRes.obj.auth = apiRes.obj.role !== "default";
        res.status(200).json(apiRes.obj);
    }
    catch (error) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        return res.status(400).json(apiRes.obj);
    }
};
