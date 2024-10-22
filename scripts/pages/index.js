import { photographCard } from "./_components/index/photographCard.js";

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
    const userCardDOM = photographCard(photographer);
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
