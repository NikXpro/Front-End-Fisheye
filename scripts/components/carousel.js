/**
 * Creates and returns a carousel component for displaying images in a lightbox view
 * @returns {HTMLElement} The carousel DOM element
 */
export function createCarousel() {
  const carousel = document.createElement("div");
  carousel.id = "carousel";
  carousel.className = "carousel";
  carousel.setAttribute("role", "dialog");
  carousel.setAttribute("aria-modal", "true");
  carousel.setAttribute("aria-label", "Visionneuse de médias");
  carousel.style.display = "none";

  const container = document.createElement("div");
  container.className = "carousel-container";
  container.setAttribute("role", "region");
  container.setAttribute("aria-live", "polite");

  const closeButton = document.createElement("button");
  closeButton.className = "close";
  closeButton.setAttribute("aria-label", "Fermer la visionneuse");
  closeButton.innerHTML =
    '<img src="assets/icons/close-carousel.svg" alt="" class="close-carousel">';

  const prevButton = document.createElement("button");
  prevButton.className = "prev";
  prevButton.setAttribute("aria-label", "Image précédente");
  prevButton.innerHTML =
    '<img src="./assets/icons/arrow-carousel.svg" alt="" class="carousel-arrow">';

  const nextButton = document.createElement("button");
  nextButton.className = "next";
  nextButton.setAttribute("aria-label", "Image suivante");
  nextButton.innerHTML =
    '<img src="./assets/icons/arrow-carousel.svg" alt="" class="carousel-arrow">';

  const image = document.createElement("img");
  image.className = "carousel-image";
  image.setAttribute("role", "img");
  image.style.display = "none";

  const video = document.createElement("video");
  video.className = "carousel-video";
  video.setAttribute("role", "application");
  video.setAttribute("aria-label", "Vidéo");
  video.controls = true;
  video.style.display = "none";

  const statusDiv = document.createElement("div");
  statusDiv.className = "carousel-status";
  statusDiv.setAttribute("role", "status");
  statusDiv.setAttribute("aria-live", "polite");

  container.appendChild(closeButton);
  container.appendChild(prevButton);
  container.appendChild(image);
  container.appendChild(video);
  container.appendChild(nextButton);
  container.appendChild(statusDiv);
  carousel.appendChild(container);

  // Gestion du focus et du clavier
  const focusableElements = [closeButton, prevButton, image, video, nextButton];

  carousel.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Escape":
        carousel.style.display = "none";
        document.body.classList.remove("no-scroll");
        break;
      case "Tab":
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        prevButton.click();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextButton.click();
        break;
    }
  });

  // Annonce pour les lecteurs d'écran lors de l'ouverture
  carousel.addEventListener("show", () => {
    statusDiv.textContent =
      "Visionneuse ouverte. Utilisez les flèches gauche et droite pour naviguer entre les images.";
    setTimeout(() => {
      statusDiv.textContent = "";
    }, 2000);
  });

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
