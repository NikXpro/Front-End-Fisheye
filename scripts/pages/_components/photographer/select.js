import { customSelect } from "../../../components/customSelect.js";

/**
 * Creates and initializes a custom select dropdown for sorting media
 * @param {Array} media - Array of media objects to sort
 * @param {Function} updateGallery - Callback function to update gallery display
 */
export function select(media, updateGallery) {
  const selectContainer = document.querySelector(".photograph-select");
  const sortByElement = document.getElementById("sort-by");
  const options = ["Popularité", "Date", "Titre"];
  const defaultText = "Popularité";
  const customSelectElement = customSelect(options, defaultText);
  selectContainer.insertBefore(customSelectElement, sortByElement.nextSibling);

  customSelectElement.addEventListener("selectionChange", (event) => {
    const sortBy = event.detail;
    const sortedMedia = sortMedia(media, sortBy);
    updateGallery(sortedMedia);
  });
}

/**
 * Sorts media array based on selected criteria
 * @param {Array} media - Array of media objects to sort
 * @param {string} sortBy - Sort criteria ("Popularité", "Date", or "Titre")
 * @returns {Array} Sorted copy of media array
 */
function sortMedia(media, sortBy) {
  return [...media].sort((a, b) => {
    switch (sortBy) {
      case "Popularité":
        return b.likes - a.likes;
      case "Date":
        return new Date(b.date) - new Date(a.date);
      case "Titre":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
}
