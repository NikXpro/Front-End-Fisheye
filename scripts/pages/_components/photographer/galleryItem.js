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
