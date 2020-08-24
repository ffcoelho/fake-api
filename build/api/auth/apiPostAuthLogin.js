"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPostAuthLogin = void 0;
const User = require("../../data/dbUser");
exports.apiPostAuthLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res.status(400).json({ error: "Bad Request" });
        }
        const userData = {
            role: user.role,
            token: user.token
        };
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(400).json({ error: "Bad Request" });
    }
};
