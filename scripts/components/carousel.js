/**
 * Creates and returns a carousel component for displaying images in a lightbox view
 * @returns {HTMLElement} The carousel DOM element
 */
export function createCarousel() {
  const carousel = document.createElement("div");
  carousel.id = "carousel";
  carousel.className = "carousel";
  carousel.setAttribute("aria-label", "image closeup view");
  carousel.style.display = "none";

  carousel.innerHTML = `
    <button class="close" aria-label="Close dialog">×</button>
    <button class="prev" aria-label="Previous image">‹</button>
    <img src="" alt="" class="carousel-image">
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
  let currentIndex = index;

  function updateImage() {
    carouselImage.src = images[currentIndex].src;
    carouselImage.alt = images[currentIndex].alt;
  }

  carousel.querySelector(".close").onclick = () => {
    console.log("Closing carousel");
    carousel.style.display = "none";
    document.body.classList.remove("no-scroll");
  };

  carousel.querySelector(".prev").onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  };

  carousel.querySelector(".next").onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  };

  updateImage();
  carousel.style.display = "flex";
  document.body.classList.add("no-scroll");
  console.log("Opening carousel, no-scroll added");
}