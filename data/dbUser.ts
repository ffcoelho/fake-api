import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDocModel, TokenModel } from "../model/user.model";

const userSchema = new mongoose.Schema({
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
},
{
  collection: "users"
});

userSchema.methods.hashPassword = async function() {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
}

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_KEY || "jwtKey");
  user.token = token;
  await user.save();
}

userSchema.statics.findByCredentials = async (username: string, password: string) => {
  const user = await User.findOne({username}) as UserDocModel;
  if (!user) {
    return null;
  } else {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }
    return user;
  }
}

userSchema.statics.findAuthenticated = async (token: string) => {
  const verifiedToken: TokenModel = jwt.verify(token, process.env.JWT_KEY || "jwtKey") as TokenModel;
  const user: UserDocModel = await User.findOne({ id: verifiedToken.id, token: token }) as UserDocModel;
  if (!user) {
    throw new Error();
  } else {
    return user;
  }
}

const User: mongoose.Model<UserDocModel, {}> = mongoose.model("User", userSchema);

module.exports = User;
