document.addEventListener("DOMContentLoaded", () => {
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

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "Thanks for reaching out! Bethany will get back to you when she can.";
      form.reset();
    });
  }

  // Interactive puzzle cards
  const puzzleDetails = {
    train: {
      title: "Train Track Puzzles",
      description: "Can Bethany connect the tracks and find the right route?"
    },
    murdoku: {
      title: "Murdoku",
      description: "A little murder mystery meets Sudoku. Use the clues, crack the case, and solve the puzzle."
    },
    jigsaw: {
      title: "Mini Jigsaws",
      description: "Small pieces. Big challenge. Can Bethany put it all together?"
    },
    diamond: {
      title: "Diamond Art",
      description: "One tiny piece at a time, turning a blank canvas into something beautiful."
    },
    crime: {
      title: "Crime Puzzle Books",
      description: "Follow the clues, investigate the evidence, and see if Bethany can solve the case."
    }
  };

  const puzzleModal = document.querySelector("#puzzle-modal");
  const puzzleModalTitle = document.querySelector("#puzzle-modal-title");
  const puzzleModalDescription = document.querySelector("#puzzle-modal-description");
  const puzzleModalClose = document.querySelector(".puzzle-modal-close");
  const puzzleCards = document.querySelectorAll(".puzzle-card-image");

  function closePuzzleModal() {
    if (!puzzleModal) return;
    puzzleModal.classList.remove("open");
    puzzleModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openPuzzleModal(key) {
    const puzzle = puzzleDetails[key];
    if (!puzzle || !puzzleModal) return;

    puzzleModalTitle.textContent = puzzle.title;
    puzzleModalDescription.textContent = puzzle.description;
    puzzleModal.classList.add("open");
    puzzleModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    puzzleModalClose?.focus();
  }

  puzzleCards.forEach(card => {
    card.addEventListener("click", () => {
      openPuzzleModal(card.dataset.puzzle);
    });
  });

  puzzleModalClose?.addEventListener("click", closePuzzleModal);

  puzzleModal?.addEventListener("click", (event) => {
    if (event.target === puzzleModal) closePuzzleModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePuzzleModal();
  });
});
