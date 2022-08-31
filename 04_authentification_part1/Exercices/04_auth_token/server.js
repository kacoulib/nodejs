import express from "express";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;

const app = express();

app.use(
  session({
    name: "simple",
    secret: "simple",
    resave: false,
    saveUninitialized: true,
  })
);

/**
 * Route principale (pour le confort de test de l'app)
 * Nul besoin de modifier cette route
 */
app.get("/", (req, res) => {
  res.send(`
    <style>html { font-size: 1.6rem; }</style>
    <h1>Routes de l'app</h1>
    <ul>
      <li><a href="/getToken">/getToken</a> (Crée un token et le met dans la session)</li>
      <li><a href="/clear">/clear</a> (Efface la session et le token)</li>
    </ul>

    <ul>
      <li><a href="/securedRoute">/securedRoute</a> (Route accessible uniquement avec un token valide dans la session)</li>
    </ul>
  `);
});

app.get("/getToken", (req, res) => {
  // …
});

app.get("/clear", (req, res) => {
  // …
});

const authMiddleware = (req, res, next) => {
  // …
};

app.get("/securedRoute", authMiddleware, (req, res) => {
  res.json({ message: "Access granted! Token is valid!" });
});

app.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
