// Importez la fonction depuis le fichier globalFunctions.js
import { createProfilePicture } from "./globalFunctions.js";

function indexTemplate(data) {
  const { name, portrait } = data;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = createProfilePicture(portrait);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, getUserCardDOM };
}

// Exportez la fonction indexTemplate
export { indexTemplate };
