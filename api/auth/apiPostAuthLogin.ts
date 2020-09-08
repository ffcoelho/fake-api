import { UserRequestHandler } from "../../model/express.model";
import { UserModel, UserDocModel } from "../../model/user.model";
import { FakeApiResponse, FakeApiResponseType } from "../../model/fakeApi.model";

const User = require("../../data/dbUser");

export const apiPostAuthLogin: UserRequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user: UserDocModel = await User.findByCredentials(username, password);
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.AUTH, user);
    res.status(200).json(apiRes.obj);
  } catch (error) {
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
};
