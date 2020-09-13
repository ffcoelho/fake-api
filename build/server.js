"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./data/db");
const routerApi_1 = require("./api/routerApi");
const app = express_1.default();
app.disable("x-powered-by");
db_1.connectDB();
app.use(express_1.default.static('public'));
app.use("/", routerApi_1.routerApi);
app.listen(process.env.PORT || 9000, () => console.log(`fake-api-helper started and listening on port: ${process.env.PORT || 9000}`));
