/**
 * Creates and returns a carousel component for displaying images in a lightbox view
 * @returns {HTMLElement} The carousel DOM element
 */
export function createCarousel() {
  const carousel = document.createElement("div");
  carousel.id = "carousel";
  carousel.className = "carousel";
  carousel.setAttribute("aria-label", "image closeup view");
  carousel.setAttribute("role", "dialog");
  carousel.style.display = "none";

  carousel.innerHTML = `
    <button class="close" aria-label="Close dialog">×</button>
    <button class="prev" aria-label="Previous image">‹</button>
    <img src="" alt="" class="carousel-image" style="display: none;">
    <video class="carousel-video" controls style="display: none;"></video>
    <button class="next" aria-label="Next image">›</button>
  `;

  document.body.appendChild(carousel);

  return carousel;
}

/**
 * Opens the carousel with the provided images starting at the specified index
 * @param {HTMLImageElement[]} images - Array of image elements to display in the carousel
 * @param {number} index - Starting index in the images array to display first
 */
export function openCarousel(images, index) {
  const carousel = document.getElementById("carousel");
  const carouselImage = carousel.querySelector(".carousel-image");
  const carouselVideo = carousel.querySelector(".carousel-video");
  const closeButton = carousel.querySelector(".close");
  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");
  let currentIndex = index;

  function updateImage() {
    const currentMedia = images[currentIndex];
    if (currentMedia.tagName === "IMG") {
      carouselImage.src = currentMedia.src;
      carouselImage.alt = currentMedia.alt;
      carouselImage.style.display = "block";
      carouselVideo.style.display = "none";
    } else if (currentMedia.tagName === "VIDEO") {
      carouselVideo.src = currentMedia.src;
      carouselVideo.style.display = "block";
      carouselImage.style.display = "none";
    }
  }

  // Gestion de la fermeture
  closeButton.onclick = closeCarousel;

  // Gestion des boutons précédent/suivant
  prevButton.onclick = showPreviousImage;
  nextButton.onclick = showNextImage;

  function closeCarousel() {
    carousel.style.display = "none";
    document.body.classList.remove("no-scroll");
    // Retourner le focus à l'image qui a ouvert le carousel
    images[currentIndex].focus();
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  // Gestion du clavier
  function handleKeyboard(event) {
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        closeCarousel();
        break;
      case "ArrowLeft":
        event.preventDefault();
        showPreviousImage();
        break;
      case "ArrowRight":
        event.preventDefault();
        showNextImage();
        break;
      case "Tab":
        // Piéger le focus dans le carousel
        const focusableElements = carousel.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
          }
        }
        break;
    }
  }

  // Ajouter les écouteurs d'événements
  carousel.addEventListener("keydown", handleKeyboard);

  // Initialisation
  updateImage();
  carousel.style.display = "flex";
  document.body.classList.add("no-scroll");

  // Mettre le focus sur le bouton de fermeture à l'ouverture
  closeButton.focus();
}
