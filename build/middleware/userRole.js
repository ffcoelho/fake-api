"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../data/dbUser");
exports.userRole = async (req, res, next) => {
    var _a;
    try {
        const token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || "none";
        const user = await User.findAuthenticated(token);
        req.role = user.role;
        next();
    }
    catch (err) {
        req.role = "default";
        next();
    }
};
