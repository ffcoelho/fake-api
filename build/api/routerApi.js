"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../middleware/bodyParser");
const fakeStatusHandler_1 = require("../middleware/fakeStatusHandler");
const userRole_1 = require("../middleware/userRole");
const apiGetDocs_1 = require("./apiGetDocs");
const apiAuthRouter_1 = require("./auth/apiAuthRouter");
const apiFileRouter_1 = require("./file/apiFileRouter");
const apiMockRouter_1 = require("./mock/apiMockRouter");
exports.routerApi = express_1.Router();
exports.routerApi.use("/auth", bodyParser_1.jsonParser, fakeStatusHandler_1.fakeStatusHandler, apiAuthRouter_1.apiAuthRouter);
exports.routerApi.use("/file", bodyParser_1.jsonParser, userRole_1.userRole, fakeStatusHandler_1.fakeStatusHandler, apiFileRouter_1.apiFileRouter);
exports.routerApi.use("/mock", bodyParser_1.jsonParser, userRole_1.userRole, fakeStatusHandler_1.fakeStatusHandler, apiMockRouter_1.apiMockRouter);
exports.routerApi.use("/", apiGetDocs_1.apiGetDocs);
