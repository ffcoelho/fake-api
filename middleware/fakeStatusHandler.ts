import { UserRequestHandler } from "../model/express.model";
import { FakeErrorValidator, FakeApiResponse, FakeApiResponseType } from "../model/fakeApi.model";

export const fakeStatusHandler: UserRequestHandler = async (req, res, next) => {
  try {
    const { fakeStatus } = req.body;
    if (!fakeStatus) { return next(); }
    if (fakeStatus.code) {
      const validError = new FakeErrorValidator().validError(fakeStatus.code);
      if (!validError) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid status code");
        return res.status(400).json(apiRes.obj);
      }
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, fakeStatus.message || "");
      return res.status(fakeStatus.code).json(apiRes.obj);
    }
    next();
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
    return res.status(400).json(apiRes.obj);
  }
}
