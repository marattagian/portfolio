// Video lightbox functionality
// Handles opening/closing video modal with validation

(function() {
    'use strict';
    
    const lightbox = document.getElementById('lightbox');
    const player = document.getElementById('video-player');
    const closeBtn = lightbox.querySelector('.close-btn');
    
    /**
     * Validate video ID format based on platform
     */
    function validateVideoID(videoID, platform) {
        if (platform === 'vimeo') {
            // Vimeo IDs are numeric
            return /^\d+$/.test(videoID);
        } else if (platform === 'youtube') {
            // YouTube IDs are 11 characters: letters, numbers, underscore, hyphen
            return /^[a-zA-Z0-9_-]{11}$/.test(videoID);
        }
        return false;
    }
    
    /**
     * Generate embed URL for video platforms
     */
    function getEmbedURL(videoID, platform) {
        if (!validateVideoID(videoID, platform)) {
            console.error(`Invalid ${platform} video ID: ${videoID}`);
            return null;
        }
        
        if (platform === 'vimeo') {
            return `https://player.vimeo.com/video/${videoID}?autoplay=1&title=0&byline=0&portrait=0`;
        } else if (platform === 'youtube') {
            // rel=0 prevents unrelated videos at the end
            return `https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0`;
        }
        
        return null;
    }
    
    /**
     * Open lightbox with video
     */
    function openLightbox(index) {
        const project = validProjects[index];
        
        if (!project) {
            console.error(`Project at index ${index} not found`);
            return;
        }
        
        const { videoID, platform, title } = project;
        const url = getEmbedURL(videoID, platform);
        
        if (!url) {
            console.error(`Could not generate embed URL for project: ${title}`);
            alert('Sorry, there was an error loading this video.');
            return;
        }
        
        // Update iframe title for accessibility
        player.setAttribute('title', `${title} video player`);
        player.src = url;
        
        // Show lightbox
        lightbox.classList.add('visible');
        document.body.style.overflow = 'hidden';
        
        // Set focus to close button for keyboard accessibility
        setTimeout(() => closeBtn.focus(), 100);
    }
    
    /**
     * Close lightbox and stop video
     */
    function closeLightbox() {
        lightbox.classList.remove('visible');
        document.body.style.overflow = '';
        
        // Stop video by clearing src after transition
        setTimeout(() => {
            player.src = '';
        }, 300);
    }
    
    /**
     * Event Listeners
     */
    
    // Close when clicking backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });
    
    // Close button click
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('visible')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Expose openLightbox globally for use in other modules
    window.openLightbox = openLightbox;
    
})();
