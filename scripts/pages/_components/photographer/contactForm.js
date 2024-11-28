function displayModal() {
  console.log("displayModal called");
  const modal = document.getElementById("contact_modal");
  const mainPhotographerName = document.querySelector(
    ".photograph-info h1"
  ).textContent;

  // Met à jour le nom du photographe dans la modale
  const photographerNameSpan = modal.querySelector(".photographer-name");
  if (photographerNameSpan) {
    photographerNameSpan.textContent = mainPhotographerName;
  }

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Gestionnaire d'événements pour la soumission du formulaire
function handleForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData.entries());

  // Log les données du formulaire
  console.log("Form Data:", {
    firstName: formValues.firstname,
    lastName: formValues.lastname,
    email: formValues.email,
    message: formValues.message,
  });

  closeModal();
}

function initModalEvents(modal) {
  const closeBtn = modal.querySelector(".close-btn");
  const form = modal.querySelector("form");

  closeBtn.addEventListener("click", closeModal);
  form.addEventListener("submit", handleForm);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Initialisation des événements
function initContactForm() {
  console.log("initContactForm called");
  const modal = document.getElementById("contact_modal");
  const contactButton = document.getElementById("contact_button");
  console.log("Contact button:", contactButton);

  if (contactButton) {
    contactButton.addEventListener("click", () => {
      console.log("Contact button clicked");
      displayModal();
    });
  } else {
    console.error("Contact button not found");
  }

  if (modal) {
    initModalEvents(modal);
  }

  window.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.getElementById("contact_modal")?.style.display === "block"
    ) {
      closeModal();
    }
  });
}

export { closeModal, displayModal, initContactForm };
