"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../middleware/bodyParser");
const customMock_1 = require("../../middleware/customMock");
const apiMockGetType_1 = require("./apiMockGetType");
exports.apiMockRouter = express_1.Router();
exports.apiMockRouter.route("/:type").get(bodyParser_1.urlEncodedParser, customMock_1.customMock, apiMockGetType_1.apiMockGetType);
