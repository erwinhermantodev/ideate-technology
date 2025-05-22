// /static/js/navigation.js
// Navigation functionality

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navbarToggle = document.getElementById('navbar-toggle');
        this.navbarMenu = document.getElementById('navbar-menu');
        this.navLinks = document.querySelectorAll('.navbar-menu a');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveNavLink();
    }
    
    bindEvents() {
        // Handle scroll
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Toggle mobile menu
        if (this.navbarToggle) {
            this.navbarToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavLinkClick(e);
            });
        });
    }
    
    handleScroll() {
        // Add scrolled class to navbar
        if (window.scrollY > 10) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        this.updateActiveNavLink();
    }
    
    toggleMobileMenu() {
        this.navbarMenu.classList.toggle('active');
    }
    
    handleNavLinkClick(e) {
        e.preventDefault();
        
        const sectionId = e.target.getAttribute('href');
        const section = document.querySelector(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu
            this.navbarMenu.classList.remove('active');
        }
    }
    
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        
        // Find the section that is currently in view
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class on nav links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const sectionId = link.getAttribute('href').substring(1);
            
            if (sectionId === current) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});