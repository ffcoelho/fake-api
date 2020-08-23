import { RequestHandler } from "express";
import { UserModel, UserDocModel } from "../../model/users.model";

const User = require("../../data/dbUser");

export const apiPostAuthLogin: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user: UserDocModel = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const userData: UserModel = {
      role: user.role,
      token: user.token
    };
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};
