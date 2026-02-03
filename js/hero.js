// Hero video section functionality
// Handles video playback and scroll indicator

(function () {
  "use strict";

  const heroVideo = document.querySelector(".hero-video");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  let playAttempts = 0;
  const maxPlayAttempts = 3;

  /**
   * Intenta reproducir el video con reintentos
   */
  function attemptPlayVideo() {
    if (!heroVideo || playAttempts >= maxPlayAttempts) return;

    playAttempts++;

    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("✅ Hero video playing successfully");
          playAttempts = maxPlayAttempts; // Detener reintentos
        })
        .catch((error) => {
          console.warn(
            `⚠️ Video autoplay attempt ${playAttempts} failed:`,
            error.message,
          );

          // Si falló, mostrar botón de play manual
          if (playAttempts >= maxPlayAttempts) {
            showPlayButton();
          }
        });
    }
  }

  /**
   * Muestra botón de play manual si autoplay falla
   */
  function showPlayButton() {
    const playButton = document.createElement("button");
    playButton.className = "hero-play-button";
    playButton.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="38" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="2"/>
                <polygon points="32,25 32,55 55,40" fill="white"/>
            </svg>
        `;
    playButton.setAttribute("aria-label", "Play hero video");

    playButton.addEventListener("click", () => {
      heroVideo
        .play()
        .then(() => {
          playButton.remove();
        })
        .catch((err) => {
          console.error("Failed to play video:", err);
        });
    });

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.appendChild(playButton);
    }
  }

  /**
   * Configurar video para mobile
   */
  if (heroVideo) {
    // Asegurar atributos críticos para mobile
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("muted", "");
    heroVideo.muted = true; // Forzar muted en JavaScript también

    // Intentar reproducir cuando esté listo
    if (heroVideo.readyState >= 3) {
      // Video ya está cargado
      attemptPlayVideo();
    } else {
      // Esperar a que cargue
      heroVideo.addEventListener("loadeddata", attemptPlayVideo, {
        once: true,
      });
      heroVideo.addEventListener("canplay", attemptPlayVideo, { once: true });
    }

    // Reintentar en primera interacción del usuario (fix para iOS)
    const retryOnInteraction = () => {
      if (heroVideo.paused && playAttempts < maxPlayAttempts) {
        console.log("🔄 Retrying video play on user interaction");
        attemptPlayVideo();
      }
    };

    ["click", "touchstart", "scroll"].forEach((eventType) => {
      document.addEventListener(eventType, retryOnInteraction, { once: true });
    });

    // Pausar video cuando no esté visible (ahorro de batería)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (heroVideo.paused) {
              heroVideo.play().catch(() => {});
            }
          } else {
            heroVideo.pause();
          }
        });
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(heroVideo);

    // Asegurar loop
    heroVideo.addEventListener("ended", () => {
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => {});
    });
  }

  /**
   * Scroll indicator click handler
   */
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const portfolioSection = document.getElementById("work");
      if (portfolioSection) {
        portfolioSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  /**
   * Hide scroll indicator when scrolling down
   */
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (!scrollIndicator) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      scrollIndicator.style.opacity = "0";
      scrollIndicator.style.pointerEvents = "none";
    } else {
      scrollIndicator.style.opacity = "1";
      scrollIndicator.style.pointerEvents = "auto";
    }

    lastScrollY = currentScrollY;
  });

  /**
   * Add parallax effect to hero section (optional)
   */
  const heroSection = document.querySelector(".hero-section");
  if (heroSection && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const parallaxSpeed = 0.5;

      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }
})();
