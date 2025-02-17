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

//Search functionality for gridview
document.addEventListener("DOMContentLoaded", () => {
  // Select the search input, search button, and all product cards
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".search");
  const productCards = document.querySelectorAll(".product-card");

  // Function to filter products based on the search query
  function filterProducts() {
    // Convert the search input to lowercase and split into words
    const query = searchInput.value.toLowerCase();
    const words = query.split(" ").filter(word => word.trim() !== "");

    // Loop through each product card
    productCards.forEach(card => {
      const titleEl = card.querySelector(".product-title");
      if (titleEl) {
        const title = titleEl.textContent.toLowerCase();
        // Check if at least one word from the search query is in the title.
        const match = words.some(word => title.includes(word));
        
        // If query is empty or any word matches, show the card; otherwise, hide it.
        card.style.display = (query === "" || match) ? "" : "none";
      }
    });
  }

  // Realtime filtering as user types
  searchInput.addEventListener("input", filterProducts);

  // Optional: Also trigger filtering when the search button is clicked
  searchButton.addEventListener("click", filterProducts);
});

//Search functionality for listview
document.addEventListener("DOMContentLoaded", () => {
  // Select the search input, search button, and list view product cards
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".search");
  // For listview, product cards have the class "product-card-list"
  const productCards = document.querySelectorAll(".product-card-list");

  // Function to filter products based on search query words
  function filterProducts() {
    // Convert the search input to lowercase and split it into individual words
    const query = searchInput.value.toLowerCase();
    const words = query.split(" ").filter(word => word.trim() !== "");

    productCards.forEach(card => {
      // Each product card should have a child element with class "product-title"
      const titleEl = card.querySelector(".product-title");
      if (titleEl) {
        const title = titleEl.textContent.toLowerCase();
        // Check if any word from the query is present in the product title
        const match = words.some(word => title.includes(word));
        // If query is empty or any word matches, show the card; otherwise, hide it
        card.style.display = (query === "" || match) ? "" : "none";
      }
    });
  }

  // Listen for realtime filtering as the user types
  searchInput.addEventListener("input", filterProducts);

  // Optional: Trigger filtering when the search button is clicked
  searchButton.addEventListener("click", filterProducts);
});

//darkmode 
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeToggleBtn.textContent = 'Toggle Light Mode';
    }
  }

  themeToggleBtn.addEventListener('click', function() {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      theme = 'dark';
      themeToggleBtn.textContent = 'Toggle Light Mode';
    } else {
      themeToggleBtn.textContent = 'Toggle Dark Mode';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
});

 

