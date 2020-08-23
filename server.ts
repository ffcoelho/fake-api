import express from "express";

const app = express();
app.disable("x-powered-by");
app.listen(process.env.PORT || 9000, () => console.log(`fake-api-helper started and listening on port: ${process.env.PORT || 9000}`));
