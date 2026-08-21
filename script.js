/* =========================================================
   MY FAST-FOOD
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       NAVIGATION MOBILE
    ===================================================== */

  const navbarCollapse = document.getElementById("mainNavbar");

  const navLinks = document.querySelectorAll("#mainNavbar .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const collapse = bootstrap.Collapse.getInstance(navbarCollapse);

        if (collapse) {
          collapse.hide();
        }
      }
    });
  });

  /* =====================================================
       NAVIGATION ACTIVE AU SCROLL
    ===================================================== */

  const sections = document.querySelectorAll("header[id], section[id]");

  function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  updateActiveLink();

  /* =====================================================
       FORMULAIRE DE CONTACT
    ===================================================== */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();

      const email = document.getElementById("email").value.trim();

      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs.");

        return;
      }

      alert(`Merci ${name} ! Votre message a bien été envoyé.`);

      contactForm.reset();
    });
  }

  /* =====================================================
       ANNÉE AUTOMATIQUE
    ===================================================== */

  const year = document.querySelector("footer .year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =====================================================
       GALERIE
       AGRANDISSEMENT DES IMAGES
    ===================================================== */

  const galleryImages = document.querySelectorAll(".gallery-image");

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      const overlay = document.createElement("div");

      overlay.className = "gallery-overlay";

      overlay.innerHTML = `
                    <div class="gallery-modal">

                        <button
                            type="button"
                            class="gallery-close"
                            aria-label="Fermer"
                        >
                            &times;
                        </button>

                        <img
                            src="${image.src}"
                            alt="${image.alt}"
                        >

                    </div>
                `;

      document.body.appendChild(overlay);

      document.body.style.overflow = "hidden";

      const close = overlay.querySelector(".gallery-close");

      function closeGallery() {
        overlay.remove();

        document.body.style.overflow = "";
      }

      close.addEventListener("click", closeGallery);

      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          closeGallery();
        }
      });

      document.addEventListener("keydown", function escapeHandler(event) {
        if (event.key === "Escape") {
          closeGallery();

          document.removeEventListener("keydown", escapeHandler);
        }
      });
    });
  });
});
