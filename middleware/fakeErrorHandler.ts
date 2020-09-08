import { UserRequestHandler } from "../model/express.model";
import { FakeErrorValidator, FakeApiResponse, FakeApiResponseType } from "../model/fakeApi.model";

export const fakeErrorHandler: UserRequestHandler = async (req, res, next) => {
  try {
    const { fakeError } = req.body;
    if (!fakeError) { return next(); }
    if (fakeError.status) {
      const validError = new FakeErrorValidator().validError(fakeError.status);
      if (!validError) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "Invalid error status code");
        return res.status(400).json(apiRes.obj);
      }
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, fakeError.message || "");
      return res.status(fakeError.status).json(apiRes.obj);
    }
    next();
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "Something went wrong");
    return res.status(400).json(apiRes.obj);
  }
}
