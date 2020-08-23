import { RequestHandler } from "express";

export const apiPostAuthSignIn: RequestHandler = async (req, res, next) => {
  // if (req.body && req.body.error) {
  //   if (req.body.status)
  // }
  const newUser = {
    role: "user"
  };
  // res.status(201).json(newUser);
  res.status(2).send("test");
};
