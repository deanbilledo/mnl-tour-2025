// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 64; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(251, 251, 253, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(251, 251, 253, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Timeline Items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items with staggered animation
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe other animated elements
document.querySelectorAll('.company-card, .adventure-card, .insight-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// Stats Counter Animation
const statsNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateStats = () => {
    if (hasAnimated) return;
    
    statsNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        if (finalNumber !== '∞') {
            let currentNumber = 0;
            const increment = parseInt(finalNumber) / 30;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= parseInt(finalNumber)) {
                    stat.textContent = finalNumber;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentNumber);
                }
            }, 50);
        }
    });
    
    hasAnimated = true;
};

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.company-card, .adventure-card, .insight-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Photo placeholder click handlers for future image uploads
document.querySelectorAll('.photo-placeholder, .company-photo, .adventure-photo').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = placeholder.querySelector('img');
                    if (img) {
                        img.src = e.target.result;
                        img.style.border = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animation for section titles
const sectionTitles = document.querySelectorAll('.section-title, .section-intro');
sectionTitles.forEach((title, index) => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    titleObserver.observe(title);
});

// Console message for developers
console.log('🚀 CS Industry Immersion Blog loaded successfully!');
console.log('💡 This journey represents the future of Computer Science education');
console.log('🤖 Remember: AI and Machine Learning are the future!');

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Industry Immersion Blog initialized');
    
    // REMOVED: Problematic parallax effect that was causing background to move down
    // The hero background will now stay fixed in place during scrolling
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', () => {
    // Make CTA buttons functional
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', () => {
            document.querySelector('#journey').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', () => {
            // You can link this to a video or photo gallery later
            document.querySelector('#adventures').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#journey').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});