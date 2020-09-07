import request from "request";
import { UserRequestHandler } from "../model/express.model";

export const fileUploader: UserRequestHandler = async (req, res, next) => {
  try {
    const postFile = request.post(process.env.BUCKETAPI || "http://localhost:3000/", function (err, resp, body) {
      if (err) {
        return res.status(400).json({ error: "FakeApiHelper: error" });
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
    console.log(err);
    res.status(400).json({ error: "FakeApiHelper: error" });
  }
}
