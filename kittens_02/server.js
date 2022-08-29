import express from "express";

const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

app.listen(port, () => {
  console.log(`Example app listening at ${BASE_URL}`);
});
