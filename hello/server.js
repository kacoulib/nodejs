import express from "express";
import { hello } from "./utils/hello.js";

const app = express(); // initialisation de l'application express
const port = 8000; // port de l'application

/* 
    method = GET, POST, PUT, DELETE, ...
    app.[method](chemin, callback)
    callback = (req, res, next) => {}
*/
app.get("/", (req, res) => {
  res.send(hello("Hello world!"));
});

// lancement de l'application sur le port 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
