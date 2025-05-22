// /static/js/contact.js
// Contact form functionality

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }
        
        // Submit form
        this.submitForm(formData);
    }
    
    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
    }
    
    validateForm(formData) {
        // Check if all fields are filled
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            this.showError('Please fill in all fields');
            return false;
        }
        
        // Validate email format
        if (!this.validateEmail(formData.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        
        // Check minimum lengths
        if (formData.name.length < 2) {
            this.showError('Name must be at least 2 characters long');
            return false;
        }
        
        if (formData.subject.length < 5) {
            this.showError('Subject must be at least 5 characters long');
            return false;
        }
        
        if (formData.message.length < 10) {
            this.showError('Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    async submitForm(formData) {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        this.setButtonLoading(submitButton, true);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok && data.status === 'success') {
                this.showSuccess(data.message || 'Your message has been sent successfully!');
                this.form.reset();
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            this.showError(error.message || 'There was an error sending your message. Please try again.');
        } finally {
            this.setButtonLoading(submitButton, false, originalText);
        }
    }
    
    setButtonLoading(button, loading, originalText = 'Send Message') {
        if (loading) {
            button.textContent = 'Sending...';
            button.disabled = true;
            button.classList.add('loading');
        } else {
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('loading');
        }
    }
    
    showSuccess(message) {
        this.removeExistingAlerts();
        const alert = this.createAlert(message, 'success');
        this.form.insertAdjacentElement('beforebegin', alert);
        this.scheduleAlertRemoval(alert);
    }
    
    showError(message) {
        this.removeExistingAlerts();
        const alert = this.createAlert(message, 'error');
        this.form.insertAdjacentElement('beforebegin', alert);
        this.scheduleAlertRemoval(alert);
    }
    
    createAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.className = 'alert-close';
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 1.2em;
            cursor: pointer;
            float: right;
            margin-left: 10px;
            opacity: 0.7;
        `;
        closeButton.addEventListener('click', () => {
            alert.remove();
        });
        
        alert.appendChild(closeButton);
        
        return alert;
    }
    
    removeExistingAlerts() {
        const existingAlerts = document.querySelectorAll('.form-alert');
        existingAlerts.forEach(alert => alert.remove());
    }
    
    scheduleAlertRemoval(alert) {
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});