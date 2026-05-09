/* ==========================================================================
   animations.js — Scroll Entrance Animations
   Handles: fade-in-on-scroll effect for sections using Intersection Observer.
   No external libraries — pure vanilla JS.
   ========================================================================== */

(function () {
  "use strict";

  // ── Fade-Up Animation on Scroll ───────────────────────────────────────
  // Elements with the class "fade-up" start invisible and translate down.
  // When they scroll into view, they smoothly fade in and slide up.
  // The corresponding CSS is in style.css (.fade-up and .fade-up.visible).

  // Create an Intersection Observer that watches for elements entering the viewport
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Add the "visible" class to trigger the CSS transition
          entry.target.classList.add("visible");

          // Stop observing this element — it only animates once
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      // Element must be at least 15% visible before triggering
      threshold: 0.15,
    }
  );

  // Find all elements with the fade-up class and start observing them
  const fadeElements = document.querySelectorAll(".fade-up");

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });
})();
