"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../middleware/bodyParser");
const apiPostAuthLogin_1 = require("./apiPostAuthLogin");
exports.apiAuthRouter = express_1.Router();
exports.apiAuthRouter.route("/").post(bodyParser_1.jsonParser, apiPostAuthLogin_1.apiPostAuthLogin);
