import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const posts = [
  { title: "Pug", date: "2022-04-21" },
  { title: "Express", date: "2022-04-22" },
  { title: "Node.js", date: "2022-04-23" },
];

app.get("/", (req, res) => {
  res.render("posts/index", { posts });
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
