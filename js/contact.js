// Contact form handling with validation
// Handles form submission and displays success/error messages

(function() {
    'use strict';
    
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show message to user
     */
    function showMessage(message, type = 'success') {
        // Remove any existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.setAttribute('role', 'alert');
        
        // Insert at top of form
        form.insertBefore(messageDiv, form.firstChild);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    /**
     * Handle form submission
     */
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            project: formData.get('project'),
            message: formData.get('message').trim()
        };
        
        // Validate
        if (!data.name || data.name.length < 2) {
            showMessage('Please enter your name', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!data.project) {
            showMessage('Please select a project type', 'error');
            return;
        }
        
        if (!data.message || data.message.length < 10) {
            showMessage('Please enter a message (at least 10 characters)', 'error');
            return;
        }
        
        // Disable submit button
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // TODO: Replace this with your actual form submission endpoint
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(data);
            
            // Success
            showMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Sorry, there was an error sending your message. Please try again or email me directly.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
    
    /**
     * Simulate form submission (replace with actual API call)
     */
    function simulateFormSubmission(data) {
        return new Promise((resolve) => {
            // Log to console for now
            console.log('Form submission:', data);
            
            // Simulate network delay
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
            
            // In production, you'd do something like:
            /*
            return fetch('https://yourbackend.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            */
        });
    }
    
    /**
     * Real-time email validation
     */
    const emailInput = form.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                this.style.borderColor = '#ff4757';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
})();
