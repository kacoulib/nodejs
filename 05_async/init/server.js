import express from "express";

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

app.get("/", async (req, res) => {
  try {
    let result = "";
    // repeat 10 times
    for (let i = 0; i < 10; i++) {
      result += await anim();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// lancement de l'application sur le port 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
