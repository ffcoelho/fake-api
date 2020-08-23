import { RequestHandler } from "express";

import { UserModel } from "../../model/users.model";

const User = require("../../data/dbUser");

export const apiPostUserSignIn: RequestHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const newUser = {
      id: req.body.id,
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
    };
    const user = new User(newUser);
    await user.hashPassword();
    await user.save();
    const userData: UserModel = { id: newUser.id, role: newUser.role, username: newUser.username };
    const token = await user.generateAuthToken();
    console.log(`token generated`);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).send(error);
  }
};
