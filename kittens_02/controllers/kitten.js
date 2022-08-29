import fs from "fs";
import { BASE_URL } from "../config/index.js";
import { getHtml } from "../helpers/getHtml.js";

const kittenController = (req, res) => {
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

    res.send(getHtml(`${catData.name} -- Kitten`, content));
  } catch (error) {
    res.status(404).send("404 Not Found");
  }
};
export default kittenController;
