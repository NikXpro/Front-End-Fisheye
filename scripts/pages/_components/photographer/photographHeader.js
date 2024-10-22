import { profilePicture } from "../../../components/profilePicture.js";

export function displayPhotographerInfo(photographer) {
  const photographHeader = document.querySelector(".photograph-header");
  const photographInfo = photographHeader.querySelector(".photograph-info");
  const photographProfilePicture = photographHeader.querySelector(
    ".photograph-profile-picture"
  );

  // Créer et ajouter les informations du photographe
  const infoContainer = document.createElement("div");

  const nameElement = document.createElement("h1");
  nameElement.classList.add("photographer-name");
  nameElement.textContent = photographer.name;
  infoContainer.appendChild(nameElement);

  const locationElement = document.createElement("h2");
  locationElement.classList.add("photographer-location");
  locationElement.textContent = `${photographer.city}, ${photographer.country}`;
  infoContainer.appendChild(locationElement);

  const taglineElement = document.createElement("p");
  taglineElement.classList.add("photographer-tagline");
  taglineElement.textContent = photographer.tagline;

  photographInfo.appendChild(infoContainer);
  photographInfo.appendChild(taglineElement);

  const profileImage = profilePicture(photographer.portrait, photographer.name);

  photographProfilePicture.appendChild(profileImage);
}
