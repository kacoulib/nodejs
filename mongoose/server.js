import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connexion à la base de données
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // options qui évitent des warnings inutiles
  })
  .then(init); // Toutes les méthodes de mongoose renvoient des promesses

async function init() {
  // Création d'un schéma
  const CatsSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
  });

  // Création d'un objet Modèle basé sur le schéma
  const CatModel = mongoose.model("cats", CatsSchema);

  // Initialisation de l'app Express
  const app = express();

  // On interroge la base de données et on récupère tous les documents liés à la collection cats
  // ==========================
  app.get("/", async (req, res) => {
    try {
      // la méthode .find() du Modèle permet de récupérer les documents
      const docs = await CatModel.find({});
      res.json(docs);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Création d'un nouveau document
  // ==========================
  app.get("/save", async (req, res) => {
    try {
      const Cat = new CatModel({ name: "Neko", date: "1990-02-02" });

      // on sauve garde l'instance du modèle que l'on vient de créer dans la base de données MongoDB kittens avec la méthode .save()
      await Cat.save();
      res.status(201).send("Saved!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Démarrage de l'app Express
  app.listen(8000, () =>
    console.log(`Server running at http://localhost:8000/`)
  );
}
