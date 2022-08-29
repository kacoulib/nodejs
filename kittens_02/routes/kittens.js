import fs from "fs";
import express from "express";

import { port, hostname, BASE_URL } from "../config/index.js";

const router = express.Router();

const gethtml = (name, content) =>
  `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${BASE_URL}/css/styles.css" />
      <title>${name}</title>
    </head>
    <body>
      <nav>
        <ul>
          <li>
            <h1>Kittens</h1>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <div class="container">
        ${content}
      </div>
    </body>
  </html>
`;

// routes/kittens.js
// Routes
router.get("/", (req, res) => {
  // recupere le fichier kittens.json
  const Kittens = fs.readFileSync("./Data/Kittens.json", "utf8");
  const KittenList = JSON.parse(Kittens);

  // renvoie la liste des chats sous forme de list
  let list = "";
  for (const { id, name, image } of KittenList) {
    list += `
          <div class='kitten'>
            <a href="/${id}">
              <h2>${name}</h2>
              <img src="${BASE_URL}/images/${image}" alt="${name}" />
            </a>
        </div>`;
  }

  res.send(gethtml("Kittens", list));
});

router.get("/:id", (req, res) => {
  // recupere le bon fichier avec [id].json
  const id = req.params.id;

  try {
    const cat = fs.readFileSync(`./Data/${id}.json`, "utf8");
    const catData = JSON.parse(cat);

    const content = `
        <div>
          <h2>${catData.name}</h2>
          <img src="${BASE_URL}/images/${catData.image}" alt="${catData.name}" />
          <h2>Age: ${catData.age}</h2>
          <p>Description: ${catData.description}</p>
        </div>
    `;

    res.send(gethtml(`${catData.name} -- Kitten`, content));
  } catch (error) {
    res.status(404).send("404 Not Found");
  }
});

export default router;
