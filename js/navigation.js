// Navigation functionality
// Handles mobile menu toggle, smooth scrolling, and active states

(function () {
  "use strict";

  const mobileMenu = document.getElementById("mobile-menu");
  const burgerBtn = document.querySelector(".burger-btn");
  const menuLinks = document.querySelectorAll("nav a, .mobile-menu a");

  /**
   * Toggle mobile menu open/closed
   */
  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /**
   * Open mobile menu
   */
  function openMenu() {
    mobileMenu.classList.add("active");
    document.body.classList.add("nav-open");
    document.body.style.overflow = "hidden";

    // Update ARIA for accessibility
    burgerBtn.setAttribute("aria-expanded", "true");

    // Focus first menu item
    setTimeout(() => {
      mobileMenu.querySelector("a")?.focus();
    }, 100);
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("nav-open");
    document.body.style.overflow = "";

    // Update ARIA for accessibility
    burgerBtn.setAttribute("aria-expanded", "false");

    // Return focus to burger button
    burgerBtn.focus();
  }

  /**
   * Smooth scroll to sections
   */
  function smoothScrollToSection(e, targetId) {
    e.preventDefault();

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  }

  /**
   * Event Listeners
   */

  // Burger button click
  if (burgerBtn) {
    burgerBtn.addEventListener("click", toggleMenu);
  }

  // Handle all navigation links
  menuLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Only handle hash links (internal navigation)
    if (href && href.startsWith("#")) {
      link.addEventListener("click", (e) => {
        smoothScrollToSection(e, href);
      });
    }
  });

  // Close menu with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Keyboard navigation within menu
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link, index) => {
    link.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          const nextLink = mobileMenuLinks[index + 1];
          if (nextLink) nextLink.focus();
          break;

        case "ArrowUp":
          e.preventDefault();
          const prevLink = mobileMenuLinks[index - 1];
          if (prevLink) prevLink.focus();
          break;
      }
    });
  });

  // Close menu when clicking outside (on mobile)
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  /**
   * Update active nav link based on scroll position
   */
  const sections = document.querySelectorAll("section[id], main[id]");

  function updateActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    menuLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // Initial update
  updateActiveNavLink();
})();
