"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        unique: true
    },
    role: {
        type: String
    },
    username: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    photoUrl: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
}, {
    collection: "users"
});
userSchema.methods.hashPassword = async function () {
    const user = this;
    user.password = await bcryptjs_1.default.hash(user.password, 8);
};
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_KEY || "jwtKey");
    user.token = token;
    await user.save();
};
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    else {
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return null;
        }
        return user;
    }
};
userSchema.statics.findAuthenticated = async (token) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "jwtKey");
    const user = await User.findOne({ id: verifiedToken.id, token: token });
    if (!user) {
        throw new Error();
    }
    else {
        return user;
    }
};
const User = mongoose_1.default.model("User", userSchema);
module.exports = User;
