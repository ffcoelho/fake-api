import { UserRequestHandler } from "../model/express.model";
import { HttpErrorValidator } from "../model/http.model";

export const fakeApi: UserRequestHandler = async (req, res, next) => {
  try {
    const { fakeApi } = req.body;
    if (!fakeApi) {
      return next();
    }
    const validError = new HttpErrorValidator().validError(fakeApi.errStatus);
    if (!validError) {
      return next();
    }
    req.fakeApiError = { status: fakeApi.errStatus, message: fakeApi.errMessage };
    next();
  } catch (err) {
    next();
  }
}
