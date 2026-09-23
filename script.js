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

  // Placeholder behavior for the contact form.
  // Later, this will be connected to Bethany's chosen email/form service.
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "Thanks for reaching out! Bethany will get back to you when she can.";
      form.reset();
    });
  }
});
