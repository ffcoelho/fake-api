import { UserRequestHandler } from "../../model/express.model";
import { UserDocModel } from "../../model/user.model";
import { FakeApiResponse, FakeApiResponseType } from "../../model/fakeApi.model";

const User = require("../../data/dbUser");

export const apiAuthPostLogin: UserRequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: no username/password provided");
      return res.status(400).json(apiRes.obj);
    }
    const user: UserDocModel = await User.findByCredentials(username, password);
    if (!user) {
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid username/password");
      return res.status(400).json(apiRes.obj);
    }
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.AUTH, user);
    res.status(200).json(apiRes.obj);
  } catch (error) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
    res.status(400).json(apiRes.obj);
  }
};
