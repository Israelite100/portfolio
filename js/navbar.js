/* ==========================================================================
   navbar.js — Navigation Active State Logic
   Handles: highlighting the correct nav link (both desktop top nav and
   mobile bottom nav) based on which section is currently in view.
   Uses Intersection Observer for efficient scroll-based detection.
   ========================================================================== */

(function () {
  "use strict";

  // Grab all sections that have an ID (these are navigation targets)
  const sections = document.querySelectorAll("section[id]");

  // Grab all nav links in the desktop top navigation
  const topNavLinks = document.querySelectorAll(
    '.top-nav .nav-links a[href^="#"]'
  );

  // Grab all nav links in the mobile bottom navigation
  const bottomNavLinks = document.querySelectorAll(".bottom-nav a");

  // ── Update Active State ────────────────────────────────────────────────
  // This function checks the current scroll position and highlights
  // the nav link that corresponds to the section currently in view.

  function updateActiveNav() {
    let currentSectionId = "";

    // Loop through all sections and find which one is at/above the viewport
    sections.forEach(function (section) {
      // 120px offset accounts for the fixed navbar height + some breathing room
      if (window.scrollY >= section.offsetTop - 120) {
        currentSectionId = section.id;
      }
    });

    // Update desktop top nav links
    topNavLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + currentSectionId;
      link.classList.toggle("active", isActive);
    });

    // Update mobile bottom nav links
    bottomNavLinks.forEach(function (link) {
      const linkSection = link.getAttribute("data-section");
      const linkHref = link.getAttribute("href");
      const isActive =
        linkSection === currentSectionId ||
        linkHref === "#" + currentSectionId;
      link.classList.toggle("active", isActive);
    });
  }

  // ── Listen for Scroll Events ──────────────────────────────────────────
  // Passive listener for better scroll performance
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // Run once on page load to set the correct initial state
  updateActiveNav();
})();
