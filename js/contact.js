/* ==========================================================================
   contact.js — EmailJS Contact Form Logic
   Handles: initializing EmailJS, validating the contact form,
   sending the email, and showing inline success/error feedback.
   
   SETUP: To make this work, you need a free EmailJS account.
   1. Sign up at https://www.emailjs.com/
   2. Create an Email Service and note the SERVICE ID
   3. Create an Email Template and note the TEMPLATE ID
   4. Go to Account > API Keys and copy your PUBLIC KEY
   5. Paste all three values in the placeholders below
   ========================================================================== */

(function () {
  "use strict";

  // ── EmailJS Configuration ─────────────────────────────────────────────
  // Replace these placeholder strings with your actual EmailJS credentials.

  const EMAILJS_PUBLIC_KEY = "kId_Z4MNtEPwSr7OB"; // ← Paste your Public Key here
  const EMAILJS_SERVICE_ID = "service_c0ianx5"; // ← Paste your Service ID here
  const EMAILJS_TEMPLATE_ID = "template_khnusea"; // ← Paste your Template ID here

  // ── Initialize EmailJS ────────────────────────────────────────────────
  // This connects the EmailJS SDK with your account using the public key.

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // ── Form Elements ─────────────────────────────────────────────────────
  const contactForm = document.getElementById("contactForm");
  const feedbackEl = document.getElementById("formFeedback");
  const submitBtn = document.getElementById("formSubmitBtn");

  // Exit early if the form doesn't exist on the page
  if (!contactForm) return;

  // ── Form Submission Handler ───────────────────────────────────────────
  contactForm.addEventListener("submit", function (e) {
    // Prevent the default form submission (page reload)
    e.preventDefault();

    // Grab form field values and trim whitespace
    const name = contactForm.querySelector("#formName").value.trim();
    const email = contactForm.querySelector("#formEmail").value.trim();
    const message = contactForm.querySelector("#formMessage").value.trim();

    // ── Validation: all fields are required ──
    if (!name || !email || !message) {
      showFeedback("Please fill in all fields before sending.", "error");
      return;
    }

    // ── Basic email format check ──
    if (!email.includes("@") || !email.includes(".")) {
      showFeedback("Please enter a valid email address.", "error");
      return;
    }

    // Check if EmailJS is loaded
    if (typeof emailjs === "undefined") {
      showFeedback(
        "Email service not loaded. Please try again later.",
        "error"
      );
      return;
    }

    // Disable the submit button to prevent double-clicks
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // ── Send the Email via EmailJS ──
    // The template parameters must match the variable names in your EmailJS template.
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(
        function () {
          // Success — show green feedback and reset the form
          showFeedback(
            "Message sent successfully! I'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        },
        function (error) {
          // Error — show red feedback with error details
          console.error("EmailJS error:", error);
          showFeedback(
            "Failed to send message. Please try again or email directly.",
            "error"
          );
        }
      )
      .finally(function () {
        // Re-enable the submit button regardless of outcome
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });

  // ── Show Feedback Message ─────────────────────────────────────────────
  // Displays an inline message below the submit button.
  // type: "success" (green) or "error" (red)

  function showFeedback(message, type) {
    // Remove any previous state classes
    feedbackEl.classList.remove("success", "error");

    // Set the message text
    feedbackEl.textContent = message;

    // Add the appropriate class (controls color and visibility via CSS)
    feedbackEl.classList.add(type);

    // Auto-hide the message after 5 seconds
    setTimeout(function () {
      feedbackEl.classList.remove("success", "error");
    }, 5000);
  }
})();
