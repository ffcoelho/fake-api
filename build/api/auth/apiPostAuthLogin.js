"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../../data/dbUser");
exports.apiPostAuthLogin = async (req, res, next) => {
    try {
        if (req.fakeApiError) {
            return res.status(req.fakeApiError.status).json({ error: req.fakeApiError.message });
        }
        const { username, password } = req.body;
        const user = await User.findByCredentials(username, password);
        const userData = {
            role: user.role,
            token: user.token
        };
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(400).json({ error: "FakeApiHelper: error" });
    }
};
