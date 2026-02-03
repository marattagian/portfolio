// Portfolio feed rendering and interactions
// Uses projects data from projects-data.js

(function () {
  "use strict";

  const container = document.getElementById("portfolio-feed");
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Track which GIFs have been loaded
  const loadedGifs = new Set();

  /**
   * Render all project cards to the DOM
   */
  function renderProjects() {
    if (!container) {
      console.error("Portfolio feed container not found");
      return;
    }

    // Clear container but keep the heading
    const heading = container.querySelector(".section-heading");

    validProjects.forEach((project, index) => {
      const card = createProjectCard(project, index);
      container.appendChild(card);
    });

    // Initialize lazy loading and interactions
    initializeLazyLoading();
    initializeTouchSupport();
    initializeKeyboardNavigation();
  }

  /**
   * Create a single project card element
   */
  function createProjectCard(project, index) {
    const { title, role, staticImage, animatedPreview } = project;
    const animationDelay = index * 0.15;

    const article = document.createElement("article");
    article.className = "project-card";
    article.setAttribute("tabindex", "0");
    article.setAttribute("role", "button");
    article.setAttribute(
      "aria-label",
      `${title} - ${role}. Click to watch video`,
    );
    article.style.animationDelay = `${animationDelay}s`;
    article.dataset.projectIndex = index;

    article.innerHTML = `
            <div class="media-wrapper">
                <video
                    class="hover-gif"
                    autoplay
                    muted
                    loop
                    playsinline
                    poster="assets/hero-poster.jpg"
                    data-src="${animatedPreview}"
                    alt="${title} animated preview"
                    aria-hidden="true">
                    <source src="assets/hero-video.mp4" type="video/mp4" />
                    <source src="assets/hero-video.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>

                <img
                    class="static-img"
                    src="${staticImage}"
                    alt="${title} project thumbnail"
                    loading="lazy">
            </div>
            <div class="project-info">
                <span class="project-title">${title}</span>
                <span class="project-role">${role}</span>
            </div>
        `;

    // Click handler to open lightbox
    article.addEventListener("click", () => {
      window.openLightbox(index);
    });

    return article;
  }

  /**
   * Initialize lazy loading for GIFs
   * Only load GIF when user hovers over the card
   */
  function initializeLazyLoading() {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      const gif = card.querySelector(".hover-gif");

      // Load on first hover/focus
      const loadGif = () => {
        if (gif.dataset.src && !loadedGifs.has(gif)) {
          gif.src = gif.dataset.src;
          loadedGifs.add(gif);
          delete gif.dataset.src;
        }
      };

      card.addEventListener("mouseenter", loadGif, { once: true });
      card.addEventListener("focus", loadGif, { once: true });
    });
  }

  /**
   * Add touch support for mobile devices
   * First tap shows info, second tap opens video
   */
  function initializeTouchSupport() {
    if (!isTouchDevice) return;

    const cards = document.querySelectorAll(".project-card");
    let lastTappedCard = null;

    cards.forEach((card) => {
      card.addEventListener("click", function (e) {
        // If this card doesn't have show-info class, show it instead of opening video
        if (!this.classList.contains("show-info")) {
          e.stopPropagation();

          // Remove show-info from all other cards
          cards.forEach((c) => c.classList.remove("show-info"));

          // Add to this card
          this.classList.add("show-info");
          lastTappedCard = this;

          // Load the GIF if not already loaded
          const gif = this.querySelector(".hover-gif");
          if (gif.dataset.src) {
            gif.src = gif.dataset.src;
            loadedGifs.add(gif);
            delete gif.dataset.src;
          }
        }
        // If it already has show-info, let the video open (don't stopPropagation)
      });
    });

    // Close info overlay when tapping outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".project-card") && lastTappedCard) {
        lastTappedCard.classList.remove("show-info");
        lastTappedCard = null;
      }
    });
  }

  /**
   * Add keyboard navigation support
   * Enter/Space to open video, Arrow keys to navigate between projects
   */
  function initializeKeyboardNavigation() {
    const cards = Array.from(document.querySelectorAll(".project-card"));

    cards.forEach((card, index) => {
      card.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault();
            const projectIndex = parseInt(card.dataset.projectIndex);
            window.openLightbox(projectIndex);
            break;

          case "ArrowDown":
          case "ArrowRight":
            e.preventDefault();
            const nextCard = cards[index + 1];
            if (nextCard) nextCard.focus();
            break;

          case "ArrowUp":
          case "ArrowLeft":
            e.preventDefault();
            const prevCard = cards[index - 1];
            if (prevCard) prevCard.focus();
            break;
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProjects);
  } else {
    renderProjects();
  }
})();
