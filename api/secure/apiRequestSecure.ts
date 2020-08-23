import { UserRequestHandler } from "../../model/express.model";

const User = require("../../data/dbUser");

export const apiRequestSecure: UserRequestHandler = async (req, res, next) => {
  console.log(req.method);
  res.status(200).json({ data: req.role });
};
