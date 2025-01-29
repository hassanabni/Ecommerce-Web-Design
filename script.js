// Check if we're on the categories page
if (document.querySelector(".categories-names")) {
    const links = document.querySelectorAll(".categories-names a");
  
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const category = link.getAttribute("data-category"); // Get the category from data attribute
  
        // Save the selected category in the `sessionStorage` to share it across pages
        sessionStorage.setItem("selectedCategory", category);
      });
    });
  }
  
  // Check if we're on the product listing page
  if (document.querySelector("#selected-categories-p")) {
    const selectedCategoryP = document.getElementById("selected-categories-p");
  
    // Retrieve the category from `sessionStorage`
    const selectedCategory = sessionStorage.getItem("selectedCategory");
  
    // Append the category if it exists
    if (selectedCategory) {
      selectedCategoryP.textContent += ` ${selectedCategory} >`;
    }
  }

  // Adding functionalities in side bar categories.
  // Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Select all sections with toggle functionality
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    // Get the heading and icon
    const toggleIcon = section.querySelector(".toggle-icon");
    const content = section.querySelector("ul");

    // Add click event listener to toggle icon
    toggleIcon.addEventListener("click", () => {
      // Toggle the 'hidden' class for the content
      content.classList.toggle("hidden");
      // Rotate the icon for visual feedback
      toggleIcon.classList.toggle("rotate");
    });
  });
});
