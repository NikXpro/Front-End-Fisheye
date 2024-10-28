import { profilePicture } from "../../../components/profilePicture.js";

/**
 * Displays the photographer's information in the header section
 * @param {Object} photographer - The photographer data object
 * @param {string} photographer.name - The photographer's name
 * @param {string} photographer.city - The photographer's city
 * @param {string} photographer.country - The photographer's country
 * @param {string} photographer.tagline - The photographer's tagline
 * @param {string} photographer.portrait - The photographer's profile picture filename
 */
export function displayPhotographerInfo(photographer) {
  const photographHeader = document.querySelector(".photograph-header");
  const photographInfo = photographHeader.querySelector(".photograph-info");
  const photographProfilePicture = photographHeader.querySelector(
    ".photograph-profile-picture"
  );

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
