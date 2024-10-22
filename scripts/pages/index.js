import { indexTemplate } from "../templates/index.js";

async function getPhotographers() {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return { photographers: [] };
  }
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = indexTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
