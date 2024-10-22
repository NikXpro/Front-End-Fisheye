// Fonction pour créer l'élément img du profil
function createProfilePicture(portrait, alt) {
  const picture = `assets/photographers/${portrait}`;
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", alt);
  return img;
}

// Fonction pour afficher la modal de contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// Fonction pour fermer la modal de contact
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Exportez les fonctions pour pouvoir les utiliser ailleurs
export { closeModal, createProfilePicture, displayModal };
