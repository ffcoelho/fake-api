"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = require("../data/dbUser");
exports.userRole = async (req, res, next) => {
    var _a;
    try {
        const token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || "none";
        const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "jwtKey");
        const user = await User.findOne({ id: verifiedToken.id, token: token });
        req.role = user.role;
        next();
    }
    catch (err) {
        req.role = "default";
        next();
    }
};
