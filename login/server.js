import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

import routes from "./routes/routes.js";

// ==========
// App initialization
// ==========

dotenv.config();
const HOSTNAME = process.env.APP_HOSTNAME;
const PORT = process.env.APP_PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "simple",
    secret: "simple",
    resave: false,
    saveUninitialized: true,
  })
);

// envoyer les données dans req.body
// format "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));

// si les données étaient envoyées en "application/json", on aurait plutôt utilisé :
// app.use(express.json());

// ==========
// App routers
// ==========

app.use("/", routes);

// ==========
// App start
// ==========

app.listen(PORT, () => {
  console.log(`App listening at http://${HOSTNAME}:${PORT}`);
});
