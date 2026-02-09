// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');
const body = document.querySelector('body');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Prevent background scrolling when menu is open
        body.style.overflow = navList.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-list li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple Scroll Animation (Fade In Elements)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Helper to reveal elements
const revealElements = () => {
    document.querySelectorAll('.visible').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
};

// Add mutation observer to watch for class changes if needed, 
// but simple timed check or CSS transition on class add works best.
// The IntersectionObserver adds the class, CSS handles the rest.
document.addEventListener('scroll', revealElements); // Fallback
setInterval(revealElements, 100); 
