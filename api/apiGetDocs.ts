import { RequestHandler } from "express";
import path from "path";

export const apiGetDocs: RequestHandler = async (req, res, next) => {
  res.sendFile("index.html", { root: path.join(__dirname, '../../public') });
};
