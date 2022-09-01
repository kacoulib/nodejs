import express from "express";
import axios from "axios";

const app = express(); // initialisation de l'application express
const port = 8000; // port de l'application

/* 
    method = GET, POST, PUT, DELETE, ...
    app.[method](chemin, callback)
    callback = (req, res, next) => {}
*/

// url = "https://jsonplaceholder.typicode.com/users"
// get all users with axios
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    res.send(result.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// without async await
app.get("/without-async-await", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// lancement de l'application sur le port 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
