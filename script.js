// Gallery filtering functionality - only run on pages with gallery
if (document.querySelectorAll('.filter-btn').length > 0) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const colorOptions = document.querySelectorAll('.color-option');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Hide all color options first
            colorOptions.forEach(option => {
                option.style.display = 'none';
            });

            galleryItems.forEach(item => {
                if (item.classList.contains('collection-card')) {
                    // Show/hide collection cards based on filter
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                } else if (!item.classList.contains('color-option')) {
                    // Handle other non-color items (existing gallery items)
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Explore Colors functionality for collection cards
if (document.querySelectorAll('.collection-card').length > 0) {
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const collection = this.getAttribute('data-collection');
            
            if (collection === 'feet') {
                // Redirect to the dedicated nail polish page
                window.location.href = 'colors.html';
                return;
            } else {
                // For other collections, show placeholder message
                alert(`${collection.charAt(0).toUpperCase() + collection.slice(1)} services coming soon! Contact us for more information.`);
            }
        });
        
        // Add hover cursor pointer style
        card.style.cursor = 'pointer';
    });
}

// Contact form handling - only run on pages with contact form
if (document.getElementById('contact-form')) {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Purchase button functionality - only run on pages with purchase buttons
if (document.querySelectorAll('.purchase-btn').length > 0) {
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemTitle = this.parentElement.querySelector('h3').textContent;
            const price = this.parentElement.querySelector('p').textContent;
            const galleryItem = this.closest('.gallery-item');
            const color = galleryItem.getAttribute('data-color');
            
            let serviceDetails = '';
            
            // Add specific details for nail polish color services
            if (galleryItem.classList.contains('nails') && galleryItem.classList.contains('feet') && color) {
                serviceDetails = `\n\nService Details:\n• Professional pedicure with ${color} nail polish\n• Includes nail shaping, cuticle care, and foot massage\n• High-quality, long-lasting polish\n• Approximately 45-60 minute session`;
                
                // Add color-specific premium details
                if (color === 'gold' || color === 'silver') {
                    serviceDetails += '\n• Premium metallic finish\n• Extra glossy topcoat included';
                } else if (color === 'black') {
                    serviceDetails += '\n• Bold, sophisticated finish\n• Perfect for special occasions';
                } else if (color === 'white') {
                    serviceDetails += '\n• Clean, classic look\n• Perfect for any occasion';
                }
            }

            alert(`🎀 PURCHASE SELECTED 🎀\n\n${itemTitle}\nPrice: ${price}${serviceDetails}\n\n💖 To complete your booking:\n1. Contact me through the Contact page\n2. Mention this specific service and color\n3. We'll schedule your appointment\n\nThank you for choosing Beach Princess! 🌊👑`);
        });
    });
}

    // Smooth scrolling for navigation - REMOVED for multi-page navigation
    // Navigation now links directly to separate pages

// Add scroll effect to header - runs on all pages
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Intersection Observer for fade-in animations - runs on all pages
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

// Apply fade-in to sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Gallery items fade-in - only if they exist
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Hamburger menu functionality - runs on all pages
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburgerBtn.contains(event.target) && !navMenu.contains(event.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a nav link
        navMenu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});
