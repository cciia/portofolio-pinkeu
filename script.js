// ===========================
// HAMBURGER MENU TOGGLE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// SMOOTH SCROLL
// ===========================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Adjust for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Handle button smooth scroll
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and content elements
document.querySelectorAll('.skill-card, .certificate-card, .project-card, .about-text').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-pink)';
        } else {
            link.style.color = 'var(--dark-gray)';
        }
    });
});

// ===========================
// HOVER ANIMATION FOR BUTTONS
// ===========================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===========================
// SCROLL-TO-TOP BUTTON (Optional)
// ===========================

window.addEventListener('scroll', () => {
    // You can add a scroll-to-top button here if desired
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================

const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const startAnimation = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 20;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 50);
        });
    };

    const aboutSection = document.querySelector('.about-stats');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startAnimation();
                observer.unobserve(aboutSection);
            }
        });
        observer.observe(aboutSection);
    }
};

animateStats();

// ===========================
// PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    
    const observer = new MutationObserver(() => {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    observer.observe(navMenu, { attributes: true });
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});
