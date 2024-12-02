/**
 * Creates a custom select dropdown component with keyboard navigation and ARIA attributes
 * @param {string[]} options - Array of option strings to display in the dropdown
 * @param {string} defaultText - Default text to show when no option is selected (defaults to "Popularité")
 * @returns {HTMLElement} The custom select dropdown element
 */
export function customSelect(options, defaultText = "Popularité") {
  const details = document.createElement("details");
  details.classList.add("custom-select");
  details.setAttribute("role", "listbox");

  const summary = document.createElement("summary");
  summary.textContent = defaultText;
  summary.setAttribute("role", "button");
  summary.setAttribute("aria-haspopup", "listbox");
  summary.setAttribute("aria-expanded", "false");
  summary.tabIndex = 0;

  const ul = document.createElement("ul");
  ul.setAttribute("role", "listbox");
  ul.tabIndex = -1;

  options.forEach((option) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.textContent = option;
    li.tabIndex = 0;
    ul.appendChild(li);
  });

  details.appendChild(summary);
  details.appendChild(ul);

  // Gestion de l'état ouvert/fermé
  details.addEventListener("toggle", () => {
    summary.setAttribute("aria-expanded", details.open);
    if (details.open) {
      ul.querySelector("li").focus();
    }
  });

  // Gestion des clics sur les options
  ul.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      summary.textContent = event.target.textContent;
      details.open = false;
      details.dispatchEvent(
        new CustomEvent("selectionChange", { detail: event.target.textContent })
      );
    }
  });

  // Gestion du clavier
  details.addEventListener("keydown", (event) => {
    const items = Array.from(ul.children);
    const currentIndex = items.indexOf(document.activeElement);

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (document.activeElement === summary) {
          details.open = !details.open;
        } else if (document.activeElement.tagName === "LI") {
          document.activeElement.click();
        }
        break;
      case "Escape":
      case "Backspace":
        if (details.open) {
          details.open = false;
          summary.focus();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!details.open) {
          details.open = true;
        } else if (currentIndex < items.length - 1) {
          items[currentIndex + 1].focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1].focus();
        }
        break;
    }
  });

  return details;
}
