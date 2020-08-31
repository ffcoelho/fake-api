"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../../data/dbUser");
exports.apiRequestOpen = async (req, res, next) => {
    if (req.fakeApiError) {
        return res.status(req.fakeApiError.status).json({ role: req.role, error: req.fakeApiError.message });
    }
    res.status(200).json({ role: req.role });
};
