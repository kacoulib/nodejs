import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ==========
// App initialization
// ==========

const hostname = "localhost";
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));

// ==========
// App routes
// ==========
let message = "";
const authMiddleware = (req, res, next) => {
  /// auth verifications ...
  // if user exists
  const user = {
    id: 1,
    username: "admin",
    password: "admin",
  };

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};

const partityMiddleware = (req, res, next) => {
  const { number } = req.params;

  // is not a number
  if (isNaN(number)) {
    return res.status(500).json({ message: `${number} n'est pas un nombre !` });
  }

  message = `Le nombre ${number} est ${number % 2 === 0 ? "pair" : "impair"}.`;
  next();
};

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.get("/check/:number", authMiddleware, partityMiddleware, (req, res) => {
  res.json({ message });
});

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
