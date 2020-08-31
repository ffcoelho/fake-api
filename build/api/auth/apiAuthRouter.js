"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiPostAuthLogin_1 = require("./apiPostAuthLogin");
exports.apiAuthRouter = express_1.Router();
exports.apiAuthRouter.route("/").post(apiPostAuthLogin_1.apiPostAuthLogin);
