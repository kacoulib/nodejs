import mongoose from "mongoose";

import { ProductModel } from "./Product.js";
import products from "./Data/products.js";

// Connexion à la base de données
mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(init);

async function init() {
  // Toutes les méthode de Mongoose renvoient des Promesses
  // ===========

  try {
    // Supprime tous les produits
    await ProductModel.deleteMany({});
    console.log("Collection dropped!\n");

    // Insère tous les produits de ./Data/products.js en base
    await ProductModel.insertMany(products);
    console.log(`${products.length} products inserted!\n`);

    // Récupère les documents insérés
    const companies = await ProductModel.find(
      {},
      { _id: 0, society: 1, price: 1, qty: 1 }
    );
    console.log("Companies:", companies, "\n");

    // Supprime le 1er document dont le nom de société correspond à "Alice"
    const removed = await ProductModel.deleteOne({ society: "Alice" });
    console.log("Deleted Alice:", removed, "\n");

    // Multiplie par 2 la quantité de chaque document
    await ProductModel.updateMany({}, { $mul: { qty: 2 } });
    console.log("Quantity multiplicated by 2!\n");

    // Récupère toutes les sociétés dont la quantité est >= 100
    const docs = await ProductModel.find(
      { qty: { $gte: 100 } },
      { _id: 0, society: 1, qty: 1 }
    ).sort({ qty: -1 });

    console.log("Companies where quantity >= 100:", docs, "\n");
  } catch (err) {
    console.error("❌ Error", err.message);
  }
}
