import express from "express";
import mongoose from "mongoose";

import router from "./router.js";

const app = express();

const hostname = "localhost";
const port = 8080;

// Connexion à la base de données
mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    // Démarrage de l'app Node une fois que la connexion Mongoose est bien établie
    app.listen(port, hostname, () =>
      console.log("API listening on http://localhost:8080/")
    )
  );

// Utilisation du router comme middleware
app.use(router);
