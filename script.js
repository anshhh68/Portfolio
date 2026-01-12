/**
 * Portfolio JavaScript - zunedaalim.com inspired animations
 * Includes: Custom cursor, scroll animations, mobile menu, smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initCustomCursor();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initLocalTime();
    initFormHandling();
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-item, .skill-tag');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Change cursor color in dark sections
    const darkSections = document.querySelectorAll('.services, .projects, .about, .footer');

    const observerOptions = {
        threshold: 0.5
    };

    const cursorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cursor.classList.add('light');
                cursorFollower.classList.add('light');
            }
        });
    }, observerOptions);

    darkSections.forEach(section => {
        cursorObserver.observe(section);
    });

    // Also check scroll position for cursor color
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
        const contactTop = document.querySelector('.contact')?.offsetTop || Infinity;
        const footerTop = document.querySelector('.footer')?.offsetTop || Infinity;

        if (scrollY < heroHeight || (scrollY >= contactTop && scrollY < footerTop)) {
            cursor.classList.remove('light');
            cursorFollower.classList.remove('light');
        } else {
            cursor.classList.add('light');
            cursorFollower.classList.add('light');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !menuOverlay) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    const serviceItems = document.querySelectorAll('.service-item');
    const projectItems = document.querySelectorAll('.project-item');
    const skillCategories = document.querySelectorAll('.skills-category');
    const educationCards = document.querySelectorAll('.education-card, .certifications-grid');
    const contactElements = document.querySelectorAll('.contact-form-container, .contact-info');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    [...animatedElements, ...serviceItems, ...projectItems, ...skillCategories, ...educationCards, ...contactElements].forEach(el => {
        observer.observe(el);
    });

    // Section title reveal animation
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect on scroll (subtle)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateParallax() {
    const scrollY = window.scrollY;
    const heroImage = document.querySelector('.hero-image-container');

    if (heroImage && scrollY < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
}

// Local Time Display
function initLocalTime() {
    const timeElement = document.getElementById('local-time');
    if (!timeElement) return;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

// Form Handling
function initFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        submitBtn.style.backgroundColor = '#4CAF50';
        submitBtn.style.borderColor = '#4CAF50';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
        }, 3000);
    });
}

// Text scramble effect for hero title (optional enhancement)
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Magnetic buttons effect
document.querySelectorAll('.hero-cta, .submit-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Add page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero [data-animate]');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, i * 100);
        });
    }, 300);
});

// Scroll progress indicator (optional)
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #FF6B35, #ff9966);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Scroll Velocity Effect for Skills & Marquee (JS-Driven for smoothness)
function initScrollVelocity() {
    const row1 = document.getElementById('skills-row-1');
    const row2 = document.getElementById('skills-row-2');
    const marquee = document.querySelector('.marquee-text');

    // Configuration
    const baseSpeed = 0.05; // Base % movement per frame
    const scrollFactor = 0.15; // How much scroll adds to speed

    let currentScrollY = window.scrollY;
    let targetVelocity = 0;
    let currentVelocity = 0;

    // State for each element: current percentage position (0 to -50)
    let pos1 = 0;
    let pos2 = 0;
    let posMq = 0;

    // Animation Loop
    function update() {
        // Calculate scroll velocity
        const newScrollY = window.scrollY;
        const scrollDelta = Math.abs(newScrollY - currentScrollY);
        currentScrollY = newScrollY;

        // Target velocity based on scroll speed
        targetVelocity = scrollDelta * scrollFactor;

        // Smoothly interpolate current velocity towards target (Lerp)
        // This prevents jerky jumps when stopping scroll
        currentVelocity += (targetVelocity - currentVelocity) * 0.1;

        // Calculate total movement for this frame
        // Direction is 1 for left-moving, -1 for right-moving
        // Note: For 'right' moving (row2), we actually want to move POSITIVE % relative to standard left scroll,
        // but since we start at -50% and go to 0 for reverse? Or just subtraction logic.
        // Let's stick to standard: moves Left = subtract %. Moves Right = add %.

        const move = baseSpeed + currentVelocity;

        // Row 1 (Left)
        if (row1) {
            pos1 -= move;
            if (pos1 <= -50) pos1 += 50; // Wrap around
            row1.style.transform = `translateX(${pos1}%)`;
        }

        // Row 2 (Right)
        if (row2) {
            pos2 += move;
            if (pos2 >= 0) pos2 -= 50; // Wrap around (assuming it starts at -50 visually? No, lets start 0 and go positive?)
            // If we move positive from 0, we see empty space if not carefully set up.
            // Better: Move Logic for Right: start at -50% and move towards 0.
            // Let's initialize pos2 to -50.
            // See initialization below.
            if (pos2 >= 0) pos2 = -50;
            row2.style.transform = `translateX(${pos2}%)`;
        }

        // Marquee (Left)
        if (marquee) {
            posMq -= (move * 0.7); // Slightly slower
            if (posMq <= -50) posMq += 50;
            marquee.style.transform = `translateX(${posMq}%)`;
        }

        requestAnimationFrame(update);
    }

    // Initialize Row 2 position to -50% so it can scroll right (towards 0) seamlessly if layout permits.
    // However, if flex-start is 0, moving positive shifts it right. 
    // To scroll RIGHT, we usually want to start at -50% and increase to 0, which reveals the left-side content.
    if (row2) pos2 = -50;

    // Start Loop
    requestAnimationFrame(update);
}

// Initialize scroll velocity
initScrollVelocity();

// Testimonial Stack Interaction
function initTestimonialStack() {
    const stack = document.getElementById('testimonial-stack');
    if (!stack) return;

    const cards = stack.querySelectorAll('.twitter-card');

    cards.forEach(card => {
        const index = card.getAttribute('data-index');

        card.addEventListener('mouseenter', () => {
            stack.classList.add(`hover-${index}`);
        });

        card.addEventListener('mouseleave', () => {
            stack.classList.remove(`hover-${index}`);
        });

        // Mobile tap interaction
        card.addEventListener('click', () => {
            // Remove other hover states
            ['hover-0', 'hover-1', 'hover-2'].forEach(cls => stack.classList.remove(cls));
            stack.classList.add(`hover-${index}`);
        });
    });
}

// Call new initialization
initTestimonialStack();
