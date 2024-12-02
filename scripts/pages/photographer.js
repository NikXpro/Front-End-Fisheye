/**
 * Main module for the photographer's portfolio page
 * Handles fetching photographer data, displaying the gallery and setting up interactions
 */

import { createCarousel, openCarousel } from "../components/carousel.js";
import { initContactForm } from "./_components/photographer/contactForm.js";
import { galleryItem } from "./_components/photographer/galleryItem.js";
import { displayPhotographerInfo } from "./_components/photographer/photographHeader.js";
import { select } from "./_components/photographer/select.js";

/**
 * Fetches photographer and their media data by ID from the JSON file
 * @param {string|number} id - The photographer's ID
 * @returns {Promise<Object>} Object containing photographer data and their media
 */
async function getPhotographerById(id) {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();

    id = parseInt(id);
    const photographer = data.photographers.find((p) => p.id === parseInt(id));
    const media = data.media.filter((m) => m.photographerId === parseInt(id));

    if (!photographer) {
      throw new Error("Photographer not found");
    }

    return { photographer, media };
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return { photographer: null, media: [] };
  }
}

/**
 * Sets up click handlers for gallery images to open in carousel
 */
function setupGalleryClick() {
  const mediaElements = document.querySelectorAll(
    ".photograph-gallery-item-image"
  );

  mediaElements.forEach((media, index) => {
    // Gestion du clic
    media.onclick = () => openCarousel(mediaElements, index);

    // Gestion de la navigation au clavier entre les médias
    media.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          const nextMedia = mediaElements[index + 1] || mediaElements[0];
          nextMedia.focus();
          break;
        case "ArrowLeft":
          event.preventDefault();
          const prevMedia =
            mediaElements[index - 1] || mediaElements[mediaElements.length - 1];
          prevMedia.focus();
          break;
        case "Home":
          event.preventDefault();
          mediaElements[0].focus();
          break;
        case "End":
          event.preventDefault();
          mediaElements[mediaElements.length - 1].focus();
          break;
      }
    });
  });
}

/**
 * Displays photographer info and media gallery on the page
 * @param {Object} photographer - The photographer's data
 * @param {Array} media - Array of the photographer's media items
 */
async function displayData(photographer, media) {
  const photographerSection = document.querySelector(".photographer");
  const galleryContainer = document.querySelector(
    ".photograph-gallery-container"
  );

  if (photographer) {
    displayPhotographerInfo(photographer);

    /**
     * Updates the gallery display with sorted media
     * @param {Array} sortedMedia - Array of sorted media items to display
     */
    function updateGallery(sortedMedia) {
      galleryContainer.innerHTML = "";
      sortedMedia.forEach((item) => {
        const galleryItemElement = galleryItem(item);
        galleryContainer.appendChild(galleryItemElement);
      });
      setupGalleryClick();
    }

    select(media, updateGallery);
    updateGallery(media);
    setupGalleryClick();
  } else {
    photographerSection.innerHTML = "<p>Photographer not found</p>";
  }
}

/**
 * Initializes the page by setting up the carousel, fetching photographer data and initializing contact form
 */
async function init() {
  createCarousel();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const { photographer, media } = await getPhotographerById(id);
    await displayData(photographer, media);
    initContactForm();
  } else {
    console.error("No photographer ID specified in URL");
  }
}

init();
