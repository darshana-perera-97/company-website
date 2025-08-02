// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
    initTypingEffect();
    initCounters();
    initParallaxEffect();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow');
                navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.classList.remove('shadow');
                navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Active nav link highlighting
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .portfolio-card, .blog-card, .stat-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Contact form handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(function() {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }
    
    // Scroll to top functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Typing effect for hero section
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            // Store the original HTML structure
            const originalHTML = heroTitle.innerHTML;
            
            // Extract text content without HTML tags for typing
            const textContent = heroTitle.textContent || heroTitle.innerText;
            
            // Clear the content
            heroTitle.innerHTML = '';
            heroTitle.style.opacity = '1';
            
            let i = 0;
            const typeWriter = function() {
                if (i < textContent.length) {
                    // Build the HTML structure as we type
                    let currentText = textContent.substring(0, i + 1);
                    
                    // Replace the text content while preserving the HTML structure
                    let newHTML = originalHTML;
                    const textToReplace = textContent;
                    
                    // Find and replace the text content with the current typed portion
                    if (newHTML.includes(textToReplace)) {
                        newHTML = newHTML.replace(textToReplace, currentText);
                    }
                    
                    heroTitle.innerHTML = newHTML;
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // Counter animation for stats
    function initCounters() {
        const counters = document.querySelectorAll('.stat-card h3');
        
        const animateCounter = function(counter) {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = function() {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        };
        
        // Observe counters for animation
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Parallax effect for hero section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const floatingCards = document.querySelectorAll('.floating-card');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                card.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
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
    
    // Enhanced loading animation with tech effects
    function addLoadingAnimation() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .portfolio-card, .blog-card');
        
        elements.forEach((el, index) => {
            el.classList.add('loading');
            
            // Add different animation classes based on element type
            if (el.classList.contains('feature-card')) {
                el.classList.add('loading-bounce');
            } else if (el.classList.contains('service-card')) {
                el.classList.add('loading-scale');
            } else if (el.classList.contains('pricing-card')) {
                el.classList.add('loading-fade-in');
            } else {
                el.classList.add('loading-fade-in');
            }
            
            setTimeout(() => {
                el.classList.add('loaded');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    // Initialize loading animation with staggered timing
    setTimeout(addLoadingAnimation, 800);
    
    // Add hover effects to cards
    function addHoverEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 1rem 3rem rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Initialize hover effects
    addHoverEffects();
    
    // Enhanced tech particle effect
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'tech-particle';
            
            // Random colors for tech particles
            const colors = ['rgba(13, 110, 253, 0.6)', 'rgba(25, 135, 84, 0.6)', 'rgba(111, 66, 193, 0.6)', 'rgba(13, 202, 240, 0.6)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: ${randomColor};
                border-radius: 50%;
                pointer-events: none;
                animation: float-particle ${4 + Math.random() * 6}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 3}s;
                box-shadow: 0 0 10px ${randomColor};
            `;
            heroSection.appendChild(particle);
        }
    }
    
    // Enhanced particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translateY(0px) translateX(0px) scale(1);
                opacity: 0.4;
            }
            25% {
                transform: translateY(-15px) translateX(5px) scale(1.2);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-25px) translateX(-5px) scale(0.8);
                opacity: 1;
            }
            75% {
                transform: translateY(-10px) translateX(10px) scale(1.1);
                opacity: 0.6;
            }
        }
        
        .tech-particle:hover {
            animation-play-state: paused;
            transform: scale(2);
            opacity: 1;
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Initialize particles
    createParticles();
    
    // Add scroll progress indicator
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #198754, #0d6efd);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Initialize scroll progress
    addScrollProgress();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Add touch gestures for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - scroll down
                window.scrollBy({ top: 100, behavior: 'smooth' });
            } else {
                // Swipe down - scroll up
                window.scrollBy({ top: -100, behavior: 'smooth' });
            }
        }
    }
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        // Scroll-based animations and effects
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Enhanced tech preloader
    function addPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.8s ease;
        `;
        preloader.innerHTML = `
            <div class="text-center text-white">
                <div class="tech-spinner mb-4"></div>
                <h3 class="text-gradient mb-2">Innovexa.lk</h3>
                <p class="text-light">Loading Innovation...</p>
                <div class="loading-bar mt-3" style="width: 200px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
                    <div class="loading-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #0d6efd, #6f42c1); border-radius: 2px; transition: width 0.3s ease;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(preloader);
        
        // Animate loading progress
        const progressBar = preloader.querySelector('.loading-progress');
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 200);
        
        // Remove preloader after page loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                progressBar.style.width = '100%';
                setTimeout(function() {
                    preloader.style.opacity = '0';
                    setTimeout(function() {
                        preloader.remove();
                    }, 800);
                }, 500);
            }, 1500);
        });
    }
    
    // Initialize preloader
    addPreloader();
    
    console.log('Innovexa.lk - Tech Innovation Platform initialized successfully!');
}); 