import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(_dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening at ${BASE_URL}`);
});
