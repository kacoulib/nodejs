import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;
const app = express();

app.use(
  session({
    name: "counter",
    secret: "counter",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/counter" }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.get("/", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.json({ counter: req.session.count });
});

app.get("/delete", (req, res) => {
  req.session.count = 0;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
