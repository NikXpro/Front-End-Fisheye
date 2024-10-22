import { createProfilePicture } from "./globalFunctions";

export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  function getUserCardDOM() {
    const header = document.querySelector(".photograph-header");
    const img = createProfilePicture(portrait, name);
    const profilePictureContainer = header.querySelector(
      ".photograph-profile-picture"
    );
    profilePictureContainer.appendChild(img);

    const photographerName = header.querySelector(".photographer-name");
    photographerName.textContent = name;

    const photographerLocation = header.querySelector(".photographer-location");
    photographerLocation.textContent = `${city}, ${country}`;

    const photographerTagline = header.querySelector(".photographer-tagline");
    photographerTagline.textContent = tagline;

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    header.appendChild(priceElement);
  }

  function createGalleryItem(media) {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("photograph-gallery-item");

    const img = document.createElement("img");
    img.classList.add("photograph-gallery-item-image");
    img.src = `/assets/media/${media.photographerId}/${media.image}`;
    img.alt = media.title;

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("photograph-gallery-item-info");

    const title = document.createElement("h3");
    title.classList.add("photograph-gallery-item-title");
    title.textContent = media.title;

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("photograph-gallery-item-likes");

    const likesCount = document.createElement("p");
    likesCount.classList.add("photograph-gallery-item-likes-count");
    likesCount.textContent = media.likes;

    const likesIcon = document.createElement("img");
    likesIcon.classList.add("photograph-gallery-item-likes-icon");
    likesIcon.src = "/assets/icons/favorite.svg";
    likesIcon.alt = "like";

    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likesIcon);

    infoContainer.appendChild(title);
    infoContainer.appendChild(likesContainer);

    galleryItem.appendChild(img);
    galleryItem.appendChild(infoContainer);

    return galleryItem;
  }

  return { getUserCardDOM, createGalleryItem };
}

export { photographerTemplate };
