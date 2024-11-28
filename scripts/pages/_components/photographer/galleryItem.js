/**
 * Creates a gallery item element for a photographer's photo
 * @param {Object} data - The photo data
 * @param {number} data.photographerId - The photographer's ID
 * @param {string} data.image - The image filename
 * @param {string} data.title - The photo title
 * @param {number} data.likes - The number of likes on the photo
 * @param {number} data.id - The unique ID of the photo
 * @returns {HTMLElement} The DOM element containing the photo and its information
 */
export function galleryItem(data) {
  const container = document.createElement("div");
  container.classList.add("photograph-gallery-item");

  const figure = document.createElement("figure");
  figure.classList.add("photograph-gallery-item-figure");

  const img = document.createElement("img");
  img.classList.add("photograph-gallery-item-image");
  img.src = `assets/photographers/${data.photographerId}/${data.image}`;
  img.alt = data.image
    ? data.image
        .replace(/[_-]/g, " ")
        .replace(/\.[^/.]+$/, "")
        .replace(/([A-Z])/g, (match, p1, offset) =>
          offset > 0 ? ` ${p1}` : p1
        )
    : "Image sans description";
  img.setAttribute("aria-labelledby", `title-${data.id}`);
  img.setAttribute("role", "button");
  img.tabIndex = 0;
  img.setAttribute("aria-label", `Ouvrir ${data.title} en vue agrandie`);

  // Gestion du clavier
  img.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      img.click();
    }
  });
  figure.appendChild(img);

  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("photograph-gallery-item-info");

  const title = document.createElement("h3");
  title.classList.add("photograph-gallery-item-title");
  title.id = `title-${data.id}`;
  title.textContent = data.title;
  figcaption.appendChild(title);

  const likesContainer = document.createElement("div");
  likesContainer.classList.add("photograph-gallery-item-likes");

  const likesCount = document.createElement("span");
  likesCount.classList.add("photograph-gallery-item-likes-count");
  likesCount.textContent = data.likes;
  likesContainer.appendChild(likesCount);

  const likeButton = document.createElement("button");
  likeButton.classList.add("photograph-gallery-item-like-button");
  likeButton.setAttribute("aria-label", "J'aime");
  likeButton.setAttribute("aria-pressed", "false");
  likeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      likeButton.click();
    }
  });

  const likesIcon = document.createElement("img");
  likesIcon.classList.add("photograph-gallery-item-likes-icon");
  likesIcon.src = "/assets/icons/favorite.svg";
  likesIcon.alt = "";
  likeButton.appendChild(likesIcon);

  likesContainer.appendChild(likeButton);
  figcaption.appendChild(likesContainer);

  figure.appendChild(figcaption);
  container.appendChild(figure);

  return container;
}
