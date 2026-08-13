// ===== DJ CONGO - MAIN APPLICATION =====

// Data Collections
const mixesData = [
    { title: "Midnight Frequencies Vol. 3", genres: "Deep House / Tech House", details: "1h 24min • Mar 2026 • 24.5K listeners", icon: "fa-headphones" },
    { title: "AfroBeats Fusion Live Set", genres: "Afrobeat / Amapiano", details: "2h 10min • Jan 2026 • 41.2K listeners", icon: "fa-drumstick-bite" },
    { title: "Underground Sessions EP.12", genres: "Techno / Minimal", details: "1h 45min • Dec 2025 • 18.8K listeners", icon: "fa-circle-nodes" },
    { title: "Summer Rooftop Vibes", genres: "Melodic House / Progressive", details: "1h 58min • Sep 2025 • 33.1K listeners", icon: "fa-sun" },
    { title: "Festival Season Opener", genres: "EDM / Big Room", details: "1h 15min • Jun 2025 • 52.7K listeners", icon: "fa-music" },
    { title: "Chill & Groove Podcast #8", genres: "Lo-Fi House / Disco", details: "1h 30min • Apr 2025 • 15.3K listeners", icon: "fa-cloud-moon" }
];

const pastEventsData = [
    { date: "21 April 2024", name: "Nabalabantu", venue: "Mbombela" },
    { date: "22 October 2022", name: "VBF", venue: "Secunda" },
    { date: "27 September 2025", name: "Farmers Market", venue: "Nkomazi" },
    { date: "31 December 2025", name: "New Year Celebration", venue: "Kamhlushwa, Mpumalanga" }
];

// Helper: Render Mixes
function renderMixes() {
    const container = document.getElementById('mixesGrid');
    if (!container) return;
    container.innerHTML = mixesData.map(mix => `
        <div class="mix-card" onclick="alert('🎧 Now playing: ${mix.title} - Demo stream coming soon!')">
            <div class="mix-icon"><i class="fas ${mix.icon}"></i></div>
            <h3>${mix.title}</h3>
            <p class="genres">${mix.genres}</p>
            <p class="details">${mix.details}</p>
        </div>
    `).join('');
}

// Render Past Events
function renderPastEvents() {
    const container = document.getElementById('pastList');
    if (!container) return;
    container.innerHTML = pastEventsData.map(past => `
        <div class="past-item">
            <span class="past-date">${past.date}</span>
            <p><strong>${past.name}</strong> — ${past.venue}</p>
        </div>
    `).join('');
}

// =========================================
// MOBILE MENU
// =========================================
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (!mobileBtn || !navMenu) return;

    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        mobileBtn.classList.toggle('menu-open');
    });

    // Close menu when a navigation link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            mobileBtn.classList.remove('menu-open');
        });
    });

    // Close menu when screen becomes desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navMenu.classList.remove('mobile-open');
            mobileBtn.classList.remove('menu-open');
        }
    });
}

// Smooth scrolling + active nav highlight
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav a, .book-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Sticky header effect
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 5%';
        } else {
            header.style.padding = '1.4rem 5%';
        }
    });
}

// =========================================
// BOOKING VIA WHATSAPP
// =========================================
function initBooking() {
    const bookBtns = document.querySelectorAll('.book-btn');
    if (!bookBtns.length) return;

    const whatsappNumber = '27794245611';
    const bookingMessage = `Hi Congo, I would like to enquire about booking you for an event.

Name:
Event:
Date:
Venue/Location:
Additional details:`;

    bookBtns.forEach(bookBtn => {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingMessage)}`;
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        });
    });
}

// =========================================
// GALLERY FUNCTIONALITY
// =========================================

// Lightbox for Photos
function initLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxName = document.getElementById('lightboxName');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const closeBtn = document.querySelector('.close-lightbox');

    const photoItems = document.querySelectorAll('.photo-item');

    photoItems.forEach(item => {
        const container = item.querySelector('.photo-container');
        if (container) {
            container.addEventListener('click', () => {
                const img = item.querySelector('.photo-image');
                const name = item.querySelector('.photo-name')?.textContent || 'Photo';
                const description = item.querySelector('.photo-description')?.textContent || '';

                if (img) {
                    lightboxImg.src = img.src;
                    lightboxName.textContent = name;
                    lightboxDescription.textContent = description;
                    lightbox.style.display = 'flex';
                }
            });
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
}

// Video Modal
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const fullVideoPlayer = document.getElementById('fullVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalDescription = document.getElementById('videoModalDescription');
    const closeVideoModal = document.querySelector('.close-video-modal');

    const videoItems = document.querySelectorAll('.video-item');

    function openVideoModal(url, title, description) {
        if (url) {
            videoSource.src = url;
            fullVideoPlayer.load();
            videoModalTitle.textContent = title;
            videoModalDescription.textContent = description;
            videoModal.style.display = 'flex';
            fullVideoPlayer.play().catch(e => console.log('Auto-play prevented'));
        }
    }

    function closeVideoModalFunc() {
        fullVideoPlayer.pause();
        fullVideoPlayer.currentTime = 0;
        videoModal.style.display = 'none';
        videoSource.src = '';
        fullVideoPlayer.load();
    }

    videoItems.forEach(item => {
        const videoUrl = item.dataset.videoUrl;
        const videoTitle = item.dataset.videoTitle || item.querySelector('.video-info h4')?.textContent || 'Video';
        const videoDescription = item.dataset.videoDescription || item.querySelector('.video-info p')?.textContent || '';

        item.addEventListener('click', () => {
            openVideoModal(videoUrl, videoTitle, videoDescription);
        });
    });

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', closeVideoModalFunc);
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModalFunc();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeVideoModalFunc();
        }
    });
}

// =========================================
// REVIEW MODAL
// =========================================
function initReviewModal() {
    const reviewModal = document.getElementById('reviewModal');
    const openBtn = document.getElementById('openReviewModal');
    const closeBtn = document.getElementById('closeReviewModal');

    if (!reviewModal || !openBtn || !closeBtn) {
        return;
    }

    const reviewForm = reviewModal.querySelector('.review-form');

    function clearReviewForm() {
        if (!reviewForm) return;
        const nameInput = reviewForm.querySelector('input[name="name"]');
        if (nameInput) nameInput.value = '';
        const placeInput = reviewForm.querySelector('input[name="place_name"]');
        if (placeInput) placeInput.value = '';
        const descriptionInput = reviewForm.querySelector('textarea[name="description"]');
        if (descriptionInput) descriptionInput.value = '';
        const ratingInput = reviewForm.querySelector('select[name="rating"]');
        if (ratingInput) {
            ratingInput.selectedIndex = 0;
            ratingInput.value = '';
        }
    }

    function clearReviewMessage() {
        const reviewMessages = reviewModal.querySelector('.review-messages');
        if (reviewMessages) {
            reviewMessages.remove();
        }
    }

    function closeReviewModal() {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearReviewForm();
        clearReviewMessage();
    }

    function openReviewModal() {
        reviewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    openBtn.addEventListener('click', () => {
        openReviewModal();
    });

    closeBtn.addEventListener('click', () => {
        closeReviewModal();
    });

    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            closeReviewModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reviewModal.style.display === 'flex') {
            closeReviewModal();
        }
    });

    const reviewError = document.querySelector('.review-error');
    const reviewSuccess = document.querySelector('.review-success');

    if (reviewError || reviewSuccess) {
        openReviewModal();
    }
}

// =========================================
// THEME TOGGLE (DAY / NIGHT)
// =========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');

    function applyTheme(theme) {
        const isLight = theme === 'light';

        document.body.classList.toggle('light-mode', isLight);

        if (icon) {
            icon.classList.toggle('fa-sun', isLight);
            icon.classList.toggle('fa-moon', !isLight);
        }

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const isCurrentlyLight =
            document.body.classList.contains('light-mode');

        applyTheme(isCurrentlyLight ? 'dark' : 'light');
    });
}

// =========================================
// DOM CONTENT LOADED
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    renderMixes();
    renderPastEvents();
    initMobileMenu();
    initSmoothScroll();
    initStickyHeader();
    initBooking();
    initLightbox();
    initVideoModal();
    initReviewModal();
    initThemeToggle();

    const footerYear = document.querySelector('.footer-copy');
    if (footerYear) {
        footerYear.innerHTML = `© ${new Date().getFullYear()} Congo. Made with <span class="heart">♥</span>`;
    }

    console.log('DJ Congo website initialized — professional edition');
});