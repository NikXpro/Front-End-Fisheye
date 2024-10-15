// Fonction pour créer l'élément img du profil
function createProfilePicture(portrait) {
  const picture = `assets/photographers/${portrait}`;
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  return img;
}

// Exportez la fonction pour pouvoir l'utiliser ailleurs
export { createProfilePicture };
