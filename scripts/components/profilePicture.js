/**
 * Creates an image element for a photographer's profile picture
 * @param {string} portrait - The filename of the photographer's portrait image
 * @param {string} alt - The alt text for the image, typically the photographer's name
 * @returns {HTMLImageElement} The DOM image element with the profile picture
 */
export function profilePicture(portrait, alt) {
  const picture = `assets/photographers/${portrait}`;
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", alt);
  img.classList.add("profile-picture");
  return img;
}
