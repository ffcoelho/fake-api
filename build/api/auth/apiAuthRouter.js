"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../middleware/bodyParser");
const apiPostAuthSignIn_1 = require("./apiPostAuthSignIn");
const apiPostAuthLogin_1 = require("./apiPostAuthLogin");
exports.apiAuthRouter = express_1.Router();
exports.apiAuthRouter.route("/signin").post(bodyParser_1.jsonParser, apiPostAuthSignIn_1.apiPostAuthSignIn);
exports.apiAuthRouter.route("/login").post(bodyParser_1.jsonParser, apiPostAuthLogin_1.apiPostAuthLogin);
