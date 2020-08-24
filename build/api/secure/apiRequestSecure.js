"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequestSecure = void 0;
const User = require("../../data/dbUser");
exports.apiRequestSecure = async (req, res, next) => {
    res.status(200).json({ role: req.role });
};
