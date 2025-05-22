// /static/js/main.js
// Main JavaScript file that coordinates all functionality

// Application initialization
class App {
    constructor() {
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Mark performance
        if (typeof Utils !== 'undefined') {
            Utils.mark?.('app-init-start');
        }
        
        // Initialize app when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        try {
            console.log('🚀 Initializing application...');
            
            // Set initialization flag
            this.isInitialized = true;
            
            // Initialize error handling
            this.setupErrorHandling();
            
            // Setup analytics (if needed)
            this.setupAnalytics();
            
            // Setup accessibility features
            this.setupAccessibility();
            
            // Mark performance
            if (typeof Utils !== 'undefined') {
                Utils.mark?.('app-init-end');
                Utils.measure?.('app-initialization', 'app-init-start', 'app-init-end');
            }
            
            console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing application:', error);
            this.handleInitializationError(error);
        }
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.reportError(event.error);
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.reportError(event.reason);
        });
    }
    
    setupAnalytics() {
        // Setup analytics tracking if needed
        // This is where you would initialize Google Analytics, etc.
        console.log('📊 Analytics setup completed');
    }
    
    setupAccessibility() {
        // Setup accessibility features
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }
    
    setupKeyboardNavigation() {
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Skip links for keyboard users
            if (e.key === 'Tab' && e.shiftKey) {
                this.handleBackwardTabNavigation(e);
            } else if (e.key === 'Tab') {
                this.handleForwardTabNavigation(e);
            }
            
            // Escape key to close mobile menu
            if (e.key === 'Escape') {
                const mobileMenu = document.querySelector('.navbar-menu.active');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }
    
    setupAriaLabels() {
        // Add ARIA labels to interactive elements that might be missing them
        const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    if (iconClass.includes('fa-arrow-up')) {
                        button.setAttribute('aria-label', 'Scroll to top');
                    } else if (iconClass.includes('fa-bars')) {
                        button.setAttribute('aria-label', 'Toggle navigation menu');
                    }
                }
            }
        });
    }
    
    setupFocusManagement() {
        // Manage focus for better accessibility
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }
    
    handleForwardTabNavigation(e) {
        // Handle forward tab navigation
        const focusableElements = this.getFocusableElements();
        const currentIndex = focusableElements.findIndex(el => el === document.activeElement);
        
        if (currentIndex === focusableElements.length - 1) {
            // If on last element, go to first
            e.preventDefault();
            focusableElements[0].focus();
        }
    }
    
    handleBackwardTabNavigation(e) {
        // Handle backward tab navigation
        const focusableElements = this.getFocusableElements();
        const currentIndex = focusableElements.findIndex(el => el === document.activeElement);
        
        if (currentIndex === 0) {
            // If on first element, go to last
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
        }
    }
    
    getFocusableElements() {
        return Array.from(document.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        )).filter(el => {
            return el.offsetWidth > 0 && el.offsetHeight > 0;
        });
    }
    
    reportError(error) {
        // Report error to logging service
        // This is where you would send errors to a service like Sentry
        console.log('🐛 Error reported:', error);
    }
    
    handleInitializationError(error) {
        // Handle initialization errors gracefully
        document.body.innerHTML = `
            <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
                <h1>⚠️ Application Error</h1>
                <p>Sorry, there was an error loading the application.</p>
                <p>Please refresh the page or try again later.</p>
                <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; margin-top: 1rem; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;
    }
}

// Performance monitoring
class PerformanceLogger {
    static logPageLoad() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                    
                    console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
                    console.log(`📊 DOM Content Loaded: ${domContentLoadedTime}ms`);
                }, 0);
            });
        }
    }
    
    static logResourceTiming() {
        if ('performance' in window && performance.getEntriesByType) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const resources = performance.getEntriesByType('resource');
                    resources.forEach(resource => {
                        if (resource.duration > 100) { // Only log slow resources
                            console.log(`🐌 Slow resource: ${resource.name} (${Math.round(resource.duration)}ms)`);
                        }
                    });
                }, 1000);
            });
        }
    }
}

// Browser compatibility checks
class CompatibilityChecker {
    static checkBrowserSupport() {
        const unsupportedFeatures = [];
        
        // Check for essential features
        if (!window.fetch) unsupportedFeatures.push('Fetch API');
        if (!window.Promise) unsupportedFeatures.push('Promises');
        if (!Array.prototype.includes) unsupportedFeatures.push('Array.includes');
        if (!Object.assign) unsupportedFeatures.push('Object.assign');
        
        if (unsupportedFeatures.length > 0) {
            console.warn('⚠️ Browser missing features:', unsupportedFeatures.join(', '));
            this.showBrowserWarning();
        }
    }
    
    static showBrowserWarning() {
        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; margin: 1rem; border-radius: 4px; font-family: Arial, sans-serif;">
                <strong>⚠️ Browser Compatibility Notice</strong>
                <p>Your browser may not support all features of this website. For the best experience, please update to a modern browser.</p>
            </div>
        `;
        document.body.insertBefore(warning, document.body.firstChild);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Check browser compatibility
    CompatibilityChecker.checkBrowserSupport();
    
    // Start performance monitoring
    PerformanceLogger.logPageLoad();
    PerformanceLogger.logResourceTiming();
    
    // Initialize main application
    new App();
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator && 'production' === 'production') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📱 Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}