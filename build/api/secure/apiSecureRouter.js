"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSecureRouter = void 0;
const express_1 = require("express");
const apiRequestSecure_1 = require("./apiRequestSecure");
exports.apiSecureRouter = express_1.Router();
exports.apiSecureRouter.route("/")
    .get(apiRequestSecure_1.apiRequestSecure)
    .post(apiRequestSecure_1.apiRequestSecure)
    .patch(apiRequestSecure_1.apiRequestSecure)
    .put(apiRequestSecure_1.apiRequestSecure)
    .delete(apiRequestSecure_1.apiRequestSecure)
    .options(apiRequestSecure_1.apiRequestSecure);
