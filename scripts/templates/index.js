// Importez la fonction depuis le fichier globalFunctions.js
import { createProfilePicture } from "./globalFunctions.js";

function indexTemplate(data) {
  const { name, portrait } = data;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.href = `photographer.html?id=${data.id}`;
    article.appendChild(link);

    const img = createProfilePicture(portrait, name);
    link.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    link.appendChild(h2);

    const location = document.createElement("p");
    location.textContent = `${data.city}, ${data.country}`;
    article.appendChild(location);

    const tagline = document.createElement("p");
    tagline.textContent = data.tagline;
    article.appendChild(tagline);

    const price = document.createElement("p");
    price.textContent = `${data.price}€/jour`;
    article.appendChild(price);

    return article;
  }
  return { name, getUserCardDOM };
}

// Exportez la fonction indexTemplate
export { indexTemplate };
