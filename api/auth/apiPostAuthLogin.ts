import { UserRequestHandler } from "../../model/express.model";
import { UserModel, UserDocModel } from "../../model/users.model";

const User = require("../../data/dbUser");

export const apiPostAuthLogin: UserRequestHandler = async (req, res, next) => {
  try {
    if (req.fakeApiError) {
      return res.status(req.fakeApiError.status).json({ error: req.fakeApiError.message });
    }
    const { username, password } = req.body;
    const user: UserDocModel = await User.findByCredentials(username, password);
    const userData: UserModel = {
      role: user.role,
      token: user.token
    };
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
};
