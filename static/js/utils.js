// /static/js/utils.js
// Utility functions and components

class Utils {
    // Debounce function
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Check if element is in viewport
    static isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 - offset &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Smooth scroll to element
    static scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Get scroll position
    static getScrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    
    // Format number with commas
    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Generate random ID
    static generateId(prefix = 'id') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Local storage helpers
    static setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting localStorage:', error);
            return false;
        }
    }
    
    static getLocalStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error getting localStorage:', error);
            return defaultValue;
        }
    }
    
    static removeLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing localStorage:', error);
            return false;
        }
    }
}

// Scroll to top button functionality
class ScrollToTop {
    constructor() {
        this.button = null;
        this.init();
    }
    
    init() {
        this.createButton();
        this.bindEvents();
    }
    
    createButton() {
        this.button = document.createElement('button');
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.className = 'scroll-top-button';
        this.button.title = 'Scroll to top';
        this.button.setAttribute('aria-label', 'Scroll to top');
        
        document.body.appendChild(this.button);
    }
    
    bindEvents() {
        // Show/hide button based on scroll position
        const toggleVisibility = Utils.throttle(() => {
            if (Utils.getScrollPosition() > 500) {
                this.show();
            } else {
                this.hide();
            }
        }, 100);
        
        window.addEventListener('scroll', toggleVisibility);
        
        // Scroll to top when button is clicked
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    }
    
    show() {
        this.button.style.display = 'block';
        // Trigger reflow for animation
        this.button.offsetHeight;
        this.button.style.opacity = '1';
        this.button.style.transform = 'translateY(0)';
    }
    
    hide() {
        this.button.style.opacity = '0';
        this.button.style.transform = 'translateY(10px)';
        setTimeout(() => {
            if (this.button.style.opacity === '0') {
                this.button.style.display = 'none';
            }
        }, 300);
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Performance monitor (for development)
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        if (process.env.NODE_ENV === 'development') {
            this.setupPerformanceObserver();
        }
    }
    
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log(`${entry.name}: ${entry.duration}ms`);
                });
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }
    
    mark(name) {
        if ('performance' in window && performance.mark) {
            performance.mark(name);
        }
    }
    
    measure(name, startMark, endMark) {
        if ('performance' in window && performance.measure) {
            performance.measure(name, startMark, endMark);
        }
    }
}

// Template validator (for development)
class TemplateValidator {
    constructor() {
        this.requiredSections = [
            'header', 'hero', 'services', 'stats', 
            'about', 'testimonials', 'contact', 'footer'
        ];
        this.init();
    }
    
    init() {
        if (process.env.NODE_ENV === 'development') {
            this.validateSections();
        }
    }
    
    validateSections() {
        this.requiredSections.forEach(section => {
            const element = document.querySelector(`[template="${section}.html"]`);
            if (!element) {
                console.warn(`Template section '${section}.html' might be missing`);
            }
        });
    }
}

// Initialize utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTop();
    new PerformanceMonitor();
    new TemplateValidator();
});

// Export Utils for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}