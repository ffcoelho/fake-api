import request from "request";
import cheerio from "cheerio";

import { UserRequestHandler } from "../model/express.model";
import { FakeApiResponse, FakeApiResponseType } from "../model/fakeApi.model";

export  const customMock: UserRequestHandler = async (req, res, next) => {
  try {
    if (!req.params.type) {
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
      return res.status(400).json(apiRes.obj);
    }
    if (req.params.type !== "custom") {
      return next();
    }
    if (!req.query.path) {
      const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: No path provided");
      return res.status(400).json(apiRes.obj);
    }
    request.get({ url: `http://dontpad.com/${req.query.path}` }, (error: any, response: { statusCode: any; }, body: any) => {
      if (error) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid folder");
        return res.status(400).json(apiRes.obj);
      }
      try {
        const $ = cheerio.load(body);
        const result = $("#text").text();
        const resultObj = JSON.parse(result);
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.MOCK, resultObj);
        return res.json(apiRes.obj);
      } catch (error) {
        const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: invalid folder content");
        return res.status(400).json(apiRes.obj);
      }
    });
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "FakeAPI ERROR: something went wrong");
    return res.status(400).json(apiRes.obj);
  }
};
