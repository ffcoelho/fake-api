"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../../data/dbUser");
exports.apiRequestSecure = async (req, res, next) => {
    res.status(200).json({ role: req.role });
};
