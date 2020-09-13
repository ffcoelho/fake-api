"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiAuthPostLogin_1 = require("./apiAuthPostLogin");
exports.apiAuthRouter = express_1.Router();
exports.apiAuthRouter.route("/").post(apiAuthPostLogin_1.apiAuthPostLogin);
