"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const apiAuthRouter_1 = require("./auth/apiAuthRouter");
const apiOpenRouter_1 = require("./open/apiOpenRouter");
const apiSecureRouter_1 = require("./secure/apiSecureRouter");
const userAuth_1 = require("../middleware/userAuth");
const userRole_1 = require("../middleware/userRole");
const swagger_json_1 = require("./swagger.json");
const swaggerOpts = {
    customSiteTitle: "Fake API Helper",
    swaggerOptions: {
        supportedSubmitMethods: [],
        docExpansion: "none"
    }
};
exports.routerApi = express_1.Router();
exports.routerApi.use("/auth", apiAuthRouter_1.apiAuthRouter);
exports.routerApi.use("/open", userRole_1.userRole, apiOpenRouter_1.apiOpenRouter);
exports.routerApi.use("/secure", userAuth_1.userAuth, apiSecureRouter_1.apiSecureRouter);
exports.routerApi.use("/", swagger_ui_express_1.default.serve);
exports.routerApi.get("/", swagger_ui_express_1.default.setup(swagger_json_1.swaggerDoc, swaggerOpts));
