/* ==========================================================================
   main.js — Core Initialization
   Handles: dark/light mode toggle (with localStorage persistence),
   smooth scrolling for all nav links, and scroll-to-top button behavior.
   ========================================================================== */

(function () {
  "use strict";

  // ── Dark / Light Mode Toggle ──────────────────────────────────────────
  // On page load, check if the user previously saved a theme preference.
  // If not, default to dark mode.

  const savedTheme = localStorage.getItem("ij-theme");
  const initialTheme = savedTheme || "dark";

  // Apply the theme immediately to prevent flash of wrong theme
  document.documentElement.setAttribute("data-theme", initialTheme);

  // Grab the toggle button
  const themeToggleBtn = document.getElementById("themeToggle");

  // Update the button icon to match the current theme
  function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    // Show sun icon in dark mode (click to go light), moon in light mode
    themeToggleBtn.textContent = currentTheme === "dark" ? "☀" : "☾";
  }

  // Set the icon on first load
  updateThemeIcon();

  // Listen for clicks on the toggle button
  themeToggleBtn.addEventListener("click", function () {
    // Determine the next theme (opposite of current)
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    // Apply the new theme to the HTML element
    document.documentElement.setAttribute("data-theme", nextTheme);

    // Save the preference so it persists across page reloads
    localStorage.setItem("ij-theme", nextTheme);

    // Update the button icon
    updateThemeIcon();
  });

  // ── Smooth Scroll for All Nav Links ───────────────────────────────────
  // When a nav link with a hash (#) href is clicked, scroll smoothly
  // to the target section instead of jumping.

  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Only handle internal hash links
      if (targetId && targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ── Scroll-to-Top Button ──────────────────────────────────────────────
  // Shows a fixed button in the bottom-right corner after scrolling 300px.
  // Clicking it smoothly scrolls back to the top of the page.

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Show or hide the button based on scroll position
  function handleScrollTopVisibility() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  // Listen for scroll events (passive for better performance)
  window.addEventListener("scroll", handleScrollTopVisibility, {
    passive: true,
  });

  // Scroll to top when the button is clicked
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Run once on load in case the page is already scrolled
  handleScrollTopVisibility();
})();
