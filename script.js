// Cart configuration loader
let cartConfig = null;

// Load cart configuration from config.js
function loadCartConfig() {
    try {
        cartConfig = window.CART_CONFIG;
        console.log('Cart configuration loaded:', cartConfig);
        return cartConfig;
    } catch (error) {
        console.error('Failed to load cart configuration:', error);
        return null;
    }
}

// Generate inventory HTML from config
function generateInventoryHTML(config) {
    if (!config || !config.inventory) {
        console.error('No inventory data available');
        return '';
    }

    // Filter and sort inventory
    let inventory = config.inventory.filter(cart => {
        if (!config.settings.displayOptions.showSoldItems && !cart.available) {
            return false;
        }
        return true;
    });

    // Sort by priority (lower number = higher priority)
    inventory.sort((a, b) => a.priority - b.priority);

    // Limit items if specified
    if (config.settings.displayOptions.maxItemsPerPage) {
        inventory = inventory.slice(0, config.settings.displayOptions.maxItemsPerPage);
    }

    let html = '';
    
    inventory.forEach(cart => {
        const featuredClass = cart.status === 'featured' ? 'featured' : '';
        const soldClass = !cart.available ? 'sold' : '';
        
        // Generate features HTML
        const featuresHTML = cart.features
            .filter(feature => ['motor', 'performance', 'wheels', 'warranty'].includes(feature.type))
            .slice(0, 6) // Limit to 6 features for display
            .map(feature => `<span class="feature">${feature.name}</span>`)
            .join('\n                            ');

        html += `
                <div class="cart-listing ${featuredClass} ${soldClass}" data-cart-id="${cart.id}">
                    ${cart.status === 'featured' ? '<div class="listing-badge">Featured</div>' : ''}
                    ${!cart.available ? '<div class="listing-badge sold-badge">Sold</div>' : ''}
                    <img src="${cart.mainImage}" alt="${cart.year} ${cart.make} ${cart.model}" loading="lazy">
                    <div class="listing-content">
                        <h3>${cart.year} ${cart.make} ${cart.model}</h3>
                        <p class="subtitle">${cart.description}</p>
                        <div class="price">$${cart.price.toLocaleString()}<span class="price-note">${cart.pricingNote}</span></div>
                        <div class="features">
                            ${featuresHTML}
                        </div>
                        ${cart.available ? 
                            `<button class="btn btn-primary" onclick="viewCartDetails('${cart.id}')">View Details</button>` :
                            `<button class="btn btn-secondary disabled" disabled>Sold</button>`
                        }
                    </div>
                </div>`;
    });

    return html;
}

// View cart details function
function viewCartDetails(cartId) {
    if (!cartConfig) {
        alert('Cart details not available. Please contact us at 404-669-6980 for more information!');
        return;
    }

    const cart = cartConfig.inventory.find(c => c.id === cartId);
    if (!cart) {
        alert('Cart not found. Please contact us at 404-669-6980 for more information!');
        return;
    }

    // Create detailed view popup or redirect
    showCartDetailsModal(cart);
}

// Show cart details in a modal
function showCartDetailsModal(cart) {
    // Create modal HTML
    const modalHTML = `
        <div class="cart-modal-overlay" onclick="closeCartModal()">
            <div class="cart-modal" onclick="event.stopPropagation()">
                <div class="cart-modal-header">
                    <h2>${cart.year} ${cart.make} ${cart.model}</h2>
                    <button class="close-modal" onclick="closeCartModal()">&times;</button>
                </div>
                <div class="cart-modal-content">
                    <div class="cart-modal-images">
                        <div class="main-image">
                            <img src="${cart.mainImage}" alt="${cart.year} ${cart.make} ${cart.model}" id="modal-main-image">
                        </div>
                        ${cart.images.length > 1 ? `
                        <div class="image-thumbnails">
                            ${cart.images.map(img => `
                                <img src="${img}" alt="Thumbnail" class="thumbnail" onclick="changeModalImage('${img}')">
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                    <div class="cart-modal-details">
                        <div class="price-section">
                            <div class="price">$${cart.price.toLocaleString()}</div>
                            <div class="price-note">${cart.pricingNote}</div>
                        </div>
                        <div class="package-info">
                            <span class="package-badge">${cart.package}</span>
                            <span class="condition-badge">${cart.condition.charAt(0).toUpperCase() + cart.condition.slice(1)}</span>
                        </div>
                        <p class="description">${cart.longDescription}</p>
                        
                        <div class="specifications">
                            <h4>Specifications</h4>
                            <div class="spec-grid">
                                ${Object.entries(cart.specifications).map(([key, value]) => `
                                    <div class="spec-item">
                                        <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                        <span class="spec-value">${value}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="features-section">
                            <h4>Features</h4>
                            <div class="features-list">
                                ${cart.features.map(feature => `
                                    <div class="feature-item">
                                        <i class="fas fa-check"></i>
                                        <span>${feature.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        ${cart.options && cart.options.length > 0 ? `
                        <div class="options-section">
                            <h4>Available Options</h4>
                            <div class="options-list">
                                ${cart.options.map(option => `
                                    <div class="option-item">
                                        <span class="option-name">${option.name}</span>
                                        <span class="option-price">+$${option.price.toLocaleString()}</span>
                                        <p class="option-description">${option.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <div class="contact-section">
                            <h4>Interested in this cart?</h4>
                            <div class="contact-buttons">
                                <a href="tel:404-669-6980" class="btn btn-primary">
                                    <i class="fas fa-phone"></i>
                                    Call 404-669-6980
                                </a>
                                <a href="mailto:wrench@eastcobbcarts.com?subject=Interest in ${cart.year} ${cart.make} ${cart.model}" class="btn btn-secondary">
                                    <i class="fas fa-envelope"></i>
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Close cart details modal
function closeCartModal() {
    const modal = document.querySelector('.cart-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Change main image in modal
function changeModalImage(imageSrc) {
    const mainImage = document.getElementById('modal-main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Update hero section with featured cart
function updateHeroSection(config) {
    if (!config || !config.inventory) {
        console.log('No config or inventory available for hero section');
        return;
    }

    const featuredCart = config.inventory.find(cart => cart.status === 'featured');
    if (!featuredCart) {
        console.log('No featured cart found');
        return;
    }

    console.log('Updating hero section with featured cart:', featuredCart);

    // Update hero image
    const heroImage = document.getElementById('hero-cart-image');
    const heroBadge = document.getElementById('hero-cart-badge');
    
    if (heroImage) {
        heroImage.src = featuredCart.mainImage;
        heroImage.alt = `${featuredCart.year} ${featuredCart.make} ${featuredCart.model}`;
        console.log('Hero image updated to:', featuredCart.mainImage);
    } else {
        console.error('Hero image element not found');
    }
    
    if (heroBadge) {
        heroBadge.textContent = `${featuredCart.year} ${featuredCart.make} ${featuredCart.model}`;
        console.log('Hero badge updated');
    } else {
        console.error('Hero badge element not found');
    }
}

// Initialize cart system
function initializeCartSystem() {
    console.log('Initializing cart system...');
    
    try {
        const config = loadCartConfig();
        if (!config) {
            console.error('Failed to load cart configuration');
            showInventoryError('Failed to load cart configuration');
            return;
        }

        console.log('Configuration loaded successfully:', config);

        // Update inventory section
        const inventoryGrid = document.getElementById('inventory-grid');
        if (inventoryGrid) {
            const inventoryHTML = generateInventoryHTML(config);
            inventoryGrid.innerHTML = inventoryHTML;
            console.log('Inventory HTML generated and inserted');
        } else {
            console.error('Inventory grid element not found');
        }

        // Update hero section
        updateHeroSection(config);

        console.log('Cart system initialized successfully');
    } catch (error) {
        console.error('Error initializing cart system:', error);
        showInventoryError('Error loading cart inventory');
    }
}

// Show error message in inventory section
function showInventoryError(message) {
    const inventoryGrid = document.getElementById('inventory-grid');
    if (inventoryGrid) {
        inventoryGrid.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <p>Please contact us at <a href="tel:404-669-6980">404-669-6980</a> for current inventory.</p>
            </div>
        `;
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart system first
    initializeCartSystem();

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animations (with delay for dynamic content)
    setTimeout(() => {
        document.querySelectorAll('.service-card, .cart-listing, .about-feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 500);

    // Initialize EmailJS
    emailjs.init("GU7qZLHpItA1asy9l"); // Replace with your EmailJS public key

    // Contact form handling with EmailJS
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields by their input elements
            const nameField = this.querySelector('input[name="name"]');
            const emailField = this.querySelector('input[name="email"]');
            const phoneField = this.querySelector('input[name="phone"]');
            const serviceField = this.querySelector('select[name="service"]');
            const messageField = this.querySelector('textarea[name="message"]');
            
            // Simple validation
            if (!nameField.value.trim() || !emailField.value.trim() || !serviceField.value) {
                alert('Please fill in all required fields (Name, Email, and Service Type).');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Prepare form data for EmailJS
            const templateParams = {
                from_name: nameField.value.trim(),
                from_email: emailField.value.trim(),
                phone: phoneField.value.trim() || 'Not provided',
                service_type: serviceField.value,
                message: messageField.value.trim() || 'No additional message provided',
                //to_email: 'wrench@eastcobbcarts.com'
                to_email: 'kenneth.ayers.iii@gmail.com'
            };
            
            // Submit form
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_pnfphxp', 'template_8z9in7e', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please call us at 404-669-6980 or email wrench@eastcobbcarts.com directly.');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, target) {
        const isNumber = !isNaN(parseInt(target));
        if (!isNumber) return;
        
        const finalNumber = parseInt(target);
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * finalNumber);
            
            element.textContent = currentValue + target.replace(/\d+/g, '').trim();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Floating elements animation enhancement
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
        
        // Add random movement on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-10px) rotate(${Math.random() * 4 - 2}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const speed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Phone number click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks (could integrate with analytics)
            console.log('Phone number clicked:', this.href);
        });
    });

    // Email link handling
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks
            console.log('Email clicked:', this.href);
        });
    });

    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already cached
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add subtle animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Handle window resize for responsive adjustments
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Utility function for smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal data attributes to elements that should animate in
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const elementsToReveal = document.querySelectorAll('.service-card, .cart-listing, .about-feature, .contact-method');
        elementsToReveal.forEach(el => {
            el.setAttribute('data-reveal', 'true');
        });
    }, 1000);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(revealOnScroll, 16));

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any final animations
    setTimeout(() => {
        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.opacity = '1';
        });
    }, 500);
}); 