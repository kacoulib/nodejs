import fs from "fs";
import { BASE_URL } from "../config/index.js";
import { getHtml } from "../helpers/getHtml.js";

const homeController = (req, res) => {
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

  res.send(getHtml("Kittens", list));
};

export default homeController;
