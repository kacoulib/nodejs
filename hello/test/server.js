import express, { application } from "express";
import axios from "axios";

const app = express(); // initialisation de l'application express
const port = 8000; // port de l'application

/* 
    method = GET, POST, PUT, DELETE, ...
    app.[method](chemin, callback)
    callback = (req, res, next) => {}
*/

const anim = () => {
  return new Promise((resolve) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWX";
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    const randomNumber = Math.floor(Math.random() * 9) + 1;

    resolve(randomNumber + randomChar);
  });
};

// lancement de l'application sur le port 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
