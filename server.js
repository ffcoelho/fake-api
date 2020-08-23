"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.disable("x-powered-by");
app.listen(process.env.PORT || 9000, function () { return console.log("fake-api-helper started and listening on port: " + (process.env.PORT || 9000)); });
