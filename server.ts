import express from "express";
import cors from "cors";
import { connectDB } from "./data/db";
import { routerApi } from "./api/routerApi";

const app = express();
app.disable("x-powered-by");

connectDB();

app.use(cors());
app.use(express.static('public'));
app.use("/", routerApi);
app.listen(process.env.PORT || 9000, () => console.log(`fake-api-helper started and listening on port: ${process.env.PORT || 9000}`));
