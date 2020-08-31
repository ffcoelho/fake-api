"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const bodyParser_1 = require("../middleware/bodyParser");
const userAuth_1 = require("../middleware/userAuth");
const userRole_1 = require("../middleware/userRole");
const fakeApi_1 = require("../middleware/fakeApi");
const apiAuthRouter_1 = require("./auth/apiAuthRouter");
const apiOpenRouter_1 = require("./open/apiOpenRouter");
const apiSecureRouter_1 = require("./secure/apiSecureRouter");
const swagger_json_1 = require("./swagger.json");
const swaggerOpts = {
    customSiteTitle: "Fake API Helper",
    swaggerOptions: {
        supportedSubmitMethods: [],
        docExpansion: "none"
    }
};
exports.routerApi = express_1.Router();
exports.routerApi.use("/auth", bodyParser_1.jsonParser, fakeApi_1.fakeApi, apiAuthRouter_1.apiAuthRouter);
exports.routerApi.use("/open", bodyParser_1.jsonParser, userRole_1.userRole, fakeApi_1.fakeApi, apiOpenRouter_1.apiOpenRouter);
exports.routerApi.use("/secure", bodyParser_1.jsonParser, userAuth_1.userAuth, fakeApi_1.fakeApi, apiSecureRouter_1.apiSecureRouter);
exports.routerApi.use("/", swagger_ui_express_1.default.serve);
exports.routerApi.get("/", swagger_ui_express_1.default.setup(swagger_json_1.swaggerDoc, swaggerOpts));
