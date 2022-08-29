import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { port, BASE_URL } from "./config/index.js";

import kittens from "./routes/kittens.js";

// Config express
const app = express();
const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(_dirname, "public")));

// import routes
app.use("/", kittens);

app.listen(port, () => {
  console.log(`Example app listening at ${BASE_URL}`);
});
