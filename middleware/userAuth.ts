import jwt from "jsonwebtoken";
import { UserRequestHandler } from "../model/express.model";
import { TokenModel } from "../model/token.model";
import { UserDocModel } from "../model/users.model";

const User = require("../data/dbUser");

export const userAuth: UserRequestHandler = async (req, res, next) => {
  try {
    const token: string = req.header("Authorization")?.replace("Bearer ", "") || "none";
    const verifiedToken: TokenModel = jwt.verify(token, process.env.JWT_KEY || "jwtKey") as TokenModel;
    const user: UserDocModel = await User.findOne({ id: verifiedToken.id, token: token });
    req.role = user.role;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
