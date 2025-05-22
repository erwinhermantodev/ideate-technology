// /static/js/animations.js
// Animation functionality

class AnimationManager {
    constructor() {
        this.statsAnimated = false;
        this.init();
    }
    
    init() {
        this.initializeStats();
        this.setupScrollAnimations();
        this.setupLazyLoading();
        
        // Bind scroll event
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    initializeStats() {
        const statElements = document.querySelectorAll('.stat-number');
        
        statElements.forEach(stat => {
            const suffix = stat.getAttribute('data-suffix') || '';
            stat.setAttribute('data-suffix', suffix);
            stat.textContent = '0';
        });
    }
    
    handleScroll() {
        this.animateStatsWhenVisible();
        this.animateElementsOnScroll();
    }
    
    animateStatsWhenVisible() {
        if (this.statsAnimated) return;
        
        const statsSection = document.getElementById('stats');
        
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                this.animateStats();
                this.statsAnimated = true;
            }
        }
    }
    
    animateStats() {
        const statElements = document.querySelectorAll('.stat-number');
        
        statElements.forEach(stat => {
            const targetValue = parseFloat(stat.getAttribute('data-count'));
            this.animateCounter(stat, 0, targetValue, 2000); // 2 second duration
        });
    }
    
    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const suffix = element.getAttribute('data-suffix') || '';
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutCubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            
            // Format the number
            if (suffix === '%') {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        elementObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => {
                elementObserver.observe(element);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            animatedElements.forEach(element => {
                element.classList.add('animated');
            });
        }
    }
    
    animateElementsOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                element.classList.add('animated');
            }
        });
    }
    
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy-image');
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.lazyLoadFallback(lazyImages);
        }
    }
    
    lazyLoadFallback(lazyImages) {
        let lazyLoadThrottleTimeout;
        
        const lazyLoad = () => {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.scrollY;
                lazyImages.forEach(img => {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-image');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});