import request from "request";
import { UserRequestHandler } from "../model/express.model";
import { FakeApiResponse, FakeApiResponseType } from "../model/fakeApi.model";

export const fileUploader: UserRequestHandler = async (req, res, next) => {
  try {
    const postFile = request.post(process.env.STORAGE_API_UPLOAD_URL || "http://localhost:3000/", function (err, resp, body) {
      if (err) {
        throw new Error();
      } else {
        const apiResp = JSON.parse(body);
        req.uploadedFile = {
          key: apiResp.key,
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
          dateTime: new Date().getTime()
        };
        next();
      }
    });
    var form = postFile.form();
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
  } catch (err) {
    const apiRes: FakeApiResponse = new FakeApiResponse(FakeApiResponseType.ERROR, "Something went wrong");
    return res.status(400).json(apiRes.obj);
  }
}
