/**
 * Creates a custom select dropdown component with keyboard navigation and ARIA attributes
 * @param {string[]} options - Array of option strings to display in the dropdown
 * @param {string} defaultText - Default text to show when no option is selected (defaults to "Popularité")
 * @returns {HTMLElement} The custom select dropdown element
 */
export function customSelect(options, defaultText = "Popularité") {
  const details = document.createElement("details");
  details.classList.add("custom-select");

  const summary = document.createElement("summary");
  summary.textContent = defaultText;
  summary.setAttribute("aria-haspopup", "listbox");
  summary.setAttribute("aria-expanded", "false");

  const ul = document.createElement("ul");
  ul.setAttribute("role", "listbox");

  options.forEach((option) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.textContent = option;
    li.tabIndex = 0;
    ul.appendChild(li);
  });

  details.appendChild(summary);
  details.appendChild(ul);

  details.addEventListener("toggle", () => {
    summary.setAttribute("aria-expanded", details.open);
  });

  ul.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      summary.textContent = event.target.textContent;
      details.open = false;
      details.dispatchEvent(
        new CustomEvent("selectionChange", { detail: event.target.textContent })
      );
    }
  });

  ul.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.target.click();
    }
  });

  return details;
}
