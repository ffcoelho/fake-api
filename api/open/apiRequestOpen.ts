import { UserRequestHandler } from "../../model/express.model";

const User = require("../../data/dbUser");

export const apiRequestOpen: UserRequestHandler = async (req, res, next) => {
  if (req.fakeApiError) {
    return res.status(req.fakeApiError.status).json({ role: req.role, error: req.fakeApiError.message });
  }
  res.status(200).json({ role: req.role });
};
