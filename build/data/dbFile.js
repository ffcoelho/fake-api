"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const fileSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        unique: true
    },
    fileName: {
        type: String
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: String
    },
    key: {
        type: String
    },
    expires: {
        type: Number
    }
}, {
    collection: "files"
});
fileSchema.methods.generateId = async function () {
    const file = this;
    file.id = uuid_1.v4().replace(/-/g, '');
    await file.save();
};
fileSchema.statics.findById = async (id) => {
    const file = await UploadedFile.findOne({ id });
    if (!file) {
        throw new Error();
    }
    else {
        return file;
    }
};
fileSchema.statics.deleteById = async (id) => {
    await UploadedFile.deleteOne({ id }, err => {
        if (err) {
            console.log(err);
        }
    });
};
const UploadedFile = mongoose_1.default.model("UploadedFile", fileSchema);
module.exports = UploadedFile;
