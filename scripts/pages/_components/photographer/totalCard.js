/**
 * Creates a fixed total card showing total likes and price per day
 * @param {number} totalLikes - Total number of likes across all media
 * @param {number} price - Photographer's daily rate
 * @returns {HTMLElement} The total card DOM element
 */
export function totalCard(totalLikes, price) {
  // Conteneur principal externe
  const outerContainer = document.createElement("div");
  outerContainer.classList.add("total-card-wrapper");

  // Conteneur principal interne
  const innerContainer = document.createElement("div");
  innerContainer.classList.add("total-card");
  innerContainer.setAttribute(
    "aria-label",
    `${totalLikes} likes au total, ${price}€ par jour`
  );

  // Conteneur pour les likes

  const likesContent = document.createElement("div");
  likesContent.classList.add("total-likes");

  const likesCount = document.createElement("span");
  likesCount.classList.add("total-likes-count");
  likesCount.setAttribute("aria-live", "polite");
  likesCount.textContent = totalLikes;

  const likesIcon = document.createElement("img");
  likesIcon.src = "/assets/icons/likes.svg";
  likesIcon.alt = "likes";
  likesIcon.classList.add("total-likes-icon");

  likesContent.appendChild(likesCount);
  likesContent.appendChild(likesIcon);

  // Conteneur pour le prix
  const priceContainer = document.createElement("div");
  priceContainer.classList.add("price-container");

  const priceContent = document.createElement("div");
  priceContent.classList.add("price-per-day");
  priceContent.textContent = `${price}€ / jour`;

  priceContainer.appendChild(priceContent);

  // Assemblage des conteneurs
  innerContainer.appendChild(likesContent);
  innerContainer.appendChild(priceContainer);
  outerContainer.appendChild(innerContainer);

  return outerContainer;
}
