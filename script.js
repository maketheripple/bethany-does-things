document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     CURRENT YEAR
     ========================================================= */
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================================================
     PUZZLE CARDS
     - Hover lift / tilt / zoom effect
     - Click opens a puzzle information modal
     - Modal closes with the X button, outside click, or Escape
     ========================================================= */
  const puzzleCards = document.querySelectorAll(
    ".puzzle-card, .puzzle-games-card"
  );

  if (puzzleCards.length) {
    puzzleCards.forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        card.style.transform =
          `perspective(900px) translateY(-8px) scale(1.03) ` +
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(900px) translateY(0) scale(1) rotateX(0) rotateY(0)";
      });

      card.addEventListener("click", () => {
        openPuzzleModal(card);
      });

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPuzzleModal(card);
        }
      });

      // Make cards keyboard accessible when they are not already buttons/links.
      if (
        !card.hasAttribute("tabindex") &&
        card.tagName !== "BUTTON" &&
        card.tagName !== "A"
      ) {
        card.setAttribute("tabindex", "0");
      }
    });
  }

  function openPuzzleModal(card) {
    let modal = document.querySelector("#puzzle-modal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "puzzle-modal";
      modal.className = "puzzle-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "puzzle-modal-title");

      modal.innerHTML = `
        <div class="puzzle-modal-content">
          <button
            class="puzzle-modal-close"
            type="button"
            aria-label="Close puzzle information"
          >&times;</button>

          <div class="puzzle-modal-body">
            <h2 id="puzzle-modal-title"></h2>
            <div class="puzzle-modal-description"></div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeButton = modal.querySelector(".puzzle-modal-close");

      closeButton.addEventListener("click", closePuzzleModal);

      modal.addEventListener("click", event => {
        if (event.target === modal) {
          closePuzzleModal();
        }
      });
    }

    const titleElement = modal.querySelector("#puzzle-modal-title");
    const descriptionElement = modal.querySelector(
      ".puzzle-modal-description"
    );

    const title =
      card.dataset.title ||
      card.querySelector("h2, h3, h4, .puzzle-title")?.textContent?.trim() ||
      "Puzzle";

    const description =
      card.dataset.description ||
      card.querySelector(
        ".puzzle-description, p"
      )?.textContent?.trim() ||
      "";

    titleElement.textContent = title;
    descriptionElement.textContent = description;

    modal.classList.add("open");
    document.body.classList.add("puzzle-modal-open");

    const closeButton = modal.querySelector(".puzzle-modal-close");
    closeButton.focus();
  }

  function closePuzzleModal() {
    const modal = document.querySelector("#puzzle-modal");

    if (!modal) {
      return;
    }

    modal.classList.remove("open");
    document.body.classList.remove("puzzle-modal-open");
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closePuzzleModal();
    }
  });

  /* =========================================================
     CONTACT FORM
     =========================================================
     The contact form submits directly to FormSubmit and is
     delivered to beth@bethanydoesthings.com.
     ========================================================= */
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const submitButton = contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (submitButton) {
        submitButton.disabled = true;

        if (submitButton.tagName === "BUTTON") {
          submitButton.textContent = "Sending...";
        } else {
          submitButton.value = "Sending...";
        }
      }
    });
  }
});
