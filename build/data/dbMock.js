"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mockSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        unique: true
    },
    data: [{}]
}, {
    collection: "mocks"
});
mockSchema.statics.findByType = async (type) => {
    const mock = await Mock.findOne({ type });
    if (!mock) {
        throw new Error();
    }
    else {
        return mock;
    }
};
const Mock = mongoose_1.default.model("Mock", mockSchema);
module.exports = Mock;
