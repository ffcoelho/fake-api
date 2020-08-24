import { UserRequestHandler } from "../../model/express.model";

const User = require("../../data/dbUser");

export const apiRequestSecure: UserRequestHandler = async (req, res, next) => {
  res.status(200).json({ role: req.role });
};
