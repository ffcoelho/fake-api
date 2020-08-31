import jwt from "jsonwebtoken";
import { UserRequestHandler } from "../model/express.model";
import { UserDocModel } from "../model/users.model";

const User = require("../data/dbUser");

export const userRole: UserRequestHandler = async (req, res, next) => {
  try {
    const token: string = req.header("Authorization")?.replace("Bearer ", "") || "none";
    const user: UserDocModel = await User.findAuthenticated(token);
    req.role = user.role;
    next();
  } catch (err) {
    req.role = "default";
    next();
  }
}
