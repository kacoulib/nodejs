import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { port, BASE_URL } from "./config/index.js";

import kittens from "./routes/kittens.js";

// Config express
const app = express();
const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(_dirname, "public")));

// ex:
const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next(); // passe à l'action suivante ou au middleware suivant
};

// 1. appel du middleware
app.use(myLogger);

// import routes
app.use("/", kittens);

app.listen(port, () => {
  console.log(`Example app listening at ${BASE_URL}`);
});
