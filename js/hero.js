// Hero video section functionality
// Handles video playback and scroll indicator

(function() {
    'use strict';
    
    const heroVideo = document.querySelector('.hero-video');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    /**
     * Ensure video plays on mobile
     * Some browsers block autoplay, so we try to play it
     */
    if (heroVideo) {
        // Try to play video
        const playPromise = heroVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Auto-play was prevented
                console.log('Video autoplay prevented:', error);
                
                // Show play button overlay or handle gracefully
                // For now, video will show poster image
            });
        }
        
        // Pause video when not in viewport (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    heroVideo.pause();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(heroVideo);
    }
    
    /**
     * Scroll indicator click handler
     */
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const portfolioSection = document.getElementById('work');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    /**
     * Hide scroll indicator when scrolling down
     */
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (!scrollIndicator) return;
        
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
        
        lastScrollY = currentScrollY;
    });
    
    /**
     * Add parallax effect to hero section (optional)
     */
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
})();
