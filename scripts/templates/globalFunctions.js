// Fonction pour créer l'élément img du profil

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
