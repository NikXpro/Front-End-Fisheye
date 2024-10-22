export function profilePicture(portrait, alt) {
  const picture = `assets/photographers/${portrait}`;
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", alt);
  img.classList.add("profile-picture");
  return img;
}
