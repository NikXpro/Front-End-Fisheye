/**
 * Main entry point for the photographers index page
 * Fetches photographer data and displays photographer cards
 */

import { photographCard } from "./_components/index/photographCard.js";

/**
 * Fetches photographer data from the JSON file
 * @returns {Promise<Object>} Object containing array of photographer data
 */
async function getPhotographers() {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { photographers: [] };
  }
}

/**
 * Displays photographer cards in the photographers section
 * @param {Array} photographers - Array of photographer data objects
 */
function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const userCardDOM = photographCard(photographer);
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Initializes the page by fetching and displaying photographer data
 */
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
