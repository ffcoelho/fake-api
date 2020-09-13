"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeApi_model_1 = require("../../model/fakeApi.model");
const User = require("../../data/dbUser");
exports.apiAuthPostLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: no username/password provided");
            return res.status(400).json(apiRes.obj);
        }
        const user = await User.findByCredentials(username, password);
        if (!user) {
            const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid username/password");
            return res.status(400).json(apiRes.obj);
        }
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.AUTH, user);
        res.status(200).json(apiRes.obj);
    }
    catch (error) {
        const apiRes = new fakeApi_model_1.FakeApiResponse(fakeApi_model_1.FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
        res.status(400).json(apiRes.obj);
    }
};
