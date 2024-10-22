import { galleryItem } from "./_components/photographer/galleryItem.js";
import { displayPhotographerInfo } from "./_components/photographer/photographHeader.js";

async function getPhotographerById(id) {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();

    id = parseInt(id);
    // Trouvez le photographe correspondant à l'ID
    const photographer = data.photographers.find((p) => p.id === parseInt(id));

    // Trouvez tous les médias associés à ce photographe
    const media = data.media.filter((m) => m.photographerId === parseInt(id));

    if (!photographer) {
      throw new Error("Photographe non trouvé");
    }

    return { photographer, media };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données du photographe :",
      error
    );
    return { photographer: null, media: [] };
  }
}

async function displayData(photographer, media) {
  const photographerSection = document.querySelector(".photographer");
  const galleryContainer = document.querySelector(
    ".photograph-gallery-container"
  );

  if (photographer) {
    displayPhotographerInfo(photographer);
    media.forEach((item) => {
      const galleryItemElement = galleryItem(item);
      galleryContainer.appendChild(galleryItemElement);
    });
  } else {
    photographerSection.innerHTML = "<p>Photographe non trouvé</p>";
  }
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const { photographer, media } = await getPhotographerById(id);
    console.log(photographer, media);
    displayData(photographer, media);
  } else {
    console.error("Aucun ID de photographe spécifié dans l'URL");
  }
}

init();
