import { profilePicture } from "../../../components/profilePicture.js";

export function photographCard(data) {
  const article = document.createElement("article");

  const link = document.createElement("a");
  link.href = `photographer.html?id=${data.id}`;
  article.appendChild(link);

  const img = profilePicture(data.portrait, data.name);
  link.appendChild(img);

  const h2 = document.createElement("h2");
  h2.textContent = data.name;
  link.appendChild(h2);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  article.appendChild(infoContainer);

  const location = document.createElement("p");
  location.textContent = `${data.city}, ${data.country}`;
  location.classList.add("location");
  infoContainer.appendChild(location);

  const tagline = document.createElement("p");
  tagline.textContent = data.tagline;
  tagline.classList.add("tagline");
  infoContainer.appendChild(tagline);

  const price = document.createElement("p");
  price.textContent = `${data.price}€/jour`;
  price.classList.add("price");
  infoContainer.appendChild(price);

  return article;
}
