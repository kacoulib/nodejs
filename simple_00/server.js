import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

// import Middlawares
import authMiddleware from "./middlewares/auth.js";
import partityMiddleware from "./middlewares/party.js";

// config
import { port, hostname, sessionSecret } from "./config/index.js";

// console.log(process.env);
// ==========
// App initialization
// ==========

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    name: "simple_00",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// ==========
// App routes
// ==========

app.get("/", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  if (req.session.count > 5) {
    return res.redirect("/check");
  }

  res.json({ message: `The count is ${req.session.count}` });
});

app.get("/check", (req, res) => {
  res.json({ message: "Redirection", count: req.session.count });
});

app.get("/delete", (req, res) => {
  req.session.count = 0;
  res.redirect("/");
});

app.get(
  "/check/:number",
  authMiddleware,
  partityMiddleware,
  ({ message }, res) => {
    res.json({ message });
  }
);

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
