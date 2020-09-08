import { UserRequestHandler } from "../../model/express.model";
import { FakeApiResponse, FakeApiResponseType, FakeResponsePagination } from "../../model/fakeApi.model";
import { MockDocModel } from "../../model/mock.model";

const Mock = require("../../data/dbMock");

export const apiMockGetType: UserRequestHandler = async (req, res, next) => {
  try {
    const type: string = req.params.type;
    let page: any = req.query.page || 1;
    let count: any = req.query.count || 10;
    const mock: MockDocModel = await Mock.findByType(type);
    const data = new FakeResponsePagination(mock.data, type, parseInt(page), parseInt(count));
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.MOCK, data);
    apiRes.obj.role = req.role || "default";
    apiRes.obj.auth = apiRes.obj.role !== "default";
    res.status(200).json(apiRes.obj);
  } catch (error) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "Something went wrong");
    return res.status(400).json(apiRes.obj);
  }
};
