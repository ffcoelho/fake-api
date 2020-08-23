import { RequestHandler } from "express";

import { UserModel } from "../../model/users.model";

const User = require("../../data/dbUser");

export const apiPostMockUser: RequestHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const newUser = {
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
    };
    const user = new User(newUser);
    await user.hashPassword();
    await user.save();
    const token = await user.generateAuthToken();
    const userData: UserModel = { role: user.role, token: user.token };
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).send(error);
  }
};
