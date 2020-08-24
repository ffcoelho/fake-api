"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPostAuthSignIn = void 0;
const User = require("../../data/dbUser");
exports.apiPostAuthSignIn = async (req, res, next) => {
    try {
        const user = await User.findByCredentials("user", "user");
        if (!user) {
            return res.status(400).json({ error: "Bad Request" });
        }
        const userData = {
            role: user.role,
            token: user.token
        };
        res.status(201).json(userData);
    }
    catch (e) {
        res.status(400).json({ error: "Bad Request" });
    }
};
