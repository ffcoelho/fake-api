import { RequestHandler } from "express";
import { UserModel, UserDocModel } from "../../model/users.model";

const User = require("../../data/dbUser");

export const apiPostAuthSignIn: RequestHandler = async (req, res, next) => {
  try {
    const user: UserDocModel = await User.findByCredentials("user", "user");
    if (!user) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const userData: UserModel = {
      role: user.role,
      token: user.token
    };
    res.status(201).json(userData);
  } catch (e) {
    res.status(400).json({ error: "Bad Request" });
  }
};
