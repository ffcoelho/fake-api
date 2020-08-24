"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiOpenRouter = void 0;
const express_1 = require("express");
const apiRequestOpen_1 = require("./apiRequestOpen");
exports.apiOpenRouter = express_1.Router();
exports.apiOpenRouter.route("/")
    .get(apiRequestOpen_1.apiRequestOpen)
    .post(apiRequestOpen_1.apiRequestOpen)
    .patch(apiRequestOpen_1.apiRequestOpen)
    .put(apiRequestOpen_1.apiRequestOpen)
    .delete(apiRequestOpen_1.apiRequestOpen)
    .options(apiRequestOpen_1.apiRequestOpen);
