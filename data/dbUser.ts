import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDocModel } from "../model/users.model";

const userSchema = new mongoose.Schema({
  id: {
    type: String
  },
  role: {
    type: String
  },
  username: {
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
  const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_KEY || "jwtKey");
  user.token = token;
  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async (username: string, password: string) => {
  const user = await User.findOne({username}) as UserDocModel;
  if (!user) {
    throw new Error();
  } else {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error();
    }
    return user;
  }
}

const User: mongoose.Model<UserDocModel, {}> = mongoose.model("User", userSchema);

module.exports = User;
