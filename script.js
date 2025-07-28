document.addEventListener('DOMContentLoaded', () => {
  // Load Header
  fetch('includes/header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // ✅ Now bind hamburger toggle after header is loaded
      const toggleBtn = document.querySelector(".menu-toggle");
      const navMenu = document.querySelector(".nav-links");

      if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", () => {
          navMenu.classList.toggle("show");
        });
      }
    });

  // Load Footer
  fetch('includes/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });

  // Contact Form Submission
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('thankYouPopup');

  if (form && popup) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          popup.style.display = 'flex';
          form.reset();
        }
      });
    });
  }

  // Close popup
  window.closePopup = function () {
    if (popup) popup.style.display = "none";
  };

  // Scroll-to-top
  const btn = document.getElementById("scrollTopBtn");
  window.onscroll = function () {
    if (btn) {
      btn.style.display =
        document.body.scrollTop > 300 || document.documentElement.scrollTop > 300
          ? "block"
          : "none";
    }
  };

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dark Mode Toggle
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");

      localStorage.setItem(
        "dark-mode",
        body.classList.contains("dark-mode") ? "enabled" : "disabled"
      );
    });
  }
});
