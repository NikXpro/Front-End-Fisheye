export function galleryItem(data) {
  const container = document.createElement("div");
  container.classList.add("photograph-gallery-item");

  const img = document.createElement("img");
  img.classList.add("photograph-gallery-item-image");
  img.src = `assets/photographers/${data.photographerId}/${data.image}`;
  img.alt = data.title;
  container.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("photograph-gallery-item-info");

  const title = document.createElement("h3");
  title.classList.add("photograph-gallery-item-title");
  title.textContent = data.title;
  info.appendChild(title);

  const likesContainer = document.createElement("div");
  likesContainer.classList.add("photograph-gallery-item-likes");

  const likesCount = document.createElement("p");
  likesCount.classList.add("photograph-gallery-item-likes-count");
  likesCount.textContent = data.likes;
  likesContainer.appendChild(likesCount);

  const likesIcon = document.createElement("img");
  likesIcon.classList.add("photograph-gallery-item-likes-icon");
  likesIcon.src = "/assets/icons/favorite.svg";
  likesIcon.alt = "like";
  likesContainer.appendChild(likesIcon);

  info.appendChild(likesContainer);
  container.appendChild(info);

  return container;
}
