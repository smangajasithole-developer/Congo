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




// Mobile menu toggle
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.backgroundColor = '#0a0a0f';
                navMenu.style.padding = '1rem';
                navMenu.style.borderBottom = '1px solid #c0a56b';
            }
        });
        
        // Reset on window resize
window.addEventListener('resize', () => {

    if (window.innerWidth > 900) {

        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.flexDirection = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.padding = '';
        navMenu.style.borderBottom = '';

    }

});
    }
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


    // =========================================
    // TEMPORARY TESTING WHATSAPP NUMBER
    // =========================================

    const whatsappNumber = '27606537993';


    // =========================================
    // BOOKING MESSAGE
    // =========================================

    const bookingMessage =
        `Hi Congo, I would like to enquire about booking you for an event.

Name:
Event:
Date:
Venue/Location:
Additional details:`;


    // =========================================
    // OPEN WHATSAPP
    // =========================================

    bookBtns.forEach(bookBtn => {

        bookBtn.addEventListener('click', (e) => {

            e.preventDefault();


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingMessage)}`;


            window.open(
                whatsappURL,
                '_blank',
                'noopener,noreferrer'
            );

        });

    });

}


// GALLERY FUNCTIONALITY - Works for any number of photos and videos

// Lightbox for Photos
function initLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxName = document.getElementById('lightboxName');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const closeBtn = document.querySelector('.close-lightbox');
    
    // Get all photos (works for any number of photos)
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
    
    // Close lightbox
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

// Video Modal - Works for any number of videos
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const fullVideoPlayer = document.getElementById('fullVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalDescription = document.getElementById('videoModalDescription');
    const closeVideoModal = document.querySelector('.close-video-modal');
    
    // Get all videos (works for any number of videos)
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
    
    // Add click events to all videos
    videoItems.forEach(item => {
        const videoUrl = item.dataset.videoUrl;
        const videoTitle = item.dataset.videoTitle || item.querySelector('.video-info h4')?.textContent || 'Video';
        const videoDescription = item.dataset.videoDescription || item.querySelector('.video-info p')?.textContent || '';
        
        const clickHandler = () => {
            openVideoModal(videoUrl, videoTitle, videoDescription);
        };
        
        item.addEventListener('click', clickHandler);
    });
    
    // Close modal events
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

    const reviewModal =
        document.getElementById('reviewModal');

    const openBtn =
        document.getElementById('openReviewModal');

    const closeBtn =
        document.getElementById('closeReviewModal');


    if (
        !reviewModal ||
        !openBtn ||
        !closeBtn
    ) {
        return;
    }


    // =========================================
    // GET REVIEW FORM
    // =========================================

    const reviewForm =
        reviewModal.querySelector('.review-form');


    // =========================================
    // CLEAR FORM
    // =========================================

    function clearReviewForm() {

        if (!reviewForm) return;


        const nameInput =
            reviewForm.querySelector(
                'input[name="name"]'
            );

        if (nameInput) {
            nameInput.value = '';
        }


        const placeInput =
            reviewForm.querySelector(
                'input[name="place_name"]'
            );

        if (placeInput) {
            placeInput.value = '';
        }


        const descriptionInput =
            reviewForm.querySelector(
                'textarea[name="description"]'
            );

        if (descriptionInput) {
            descriptionInput.value = '';
        }


        const ratingInput =
            reviewForm.querySelector(
                'select[name="rating"]'
            );

        if (ratingInput) {
            ratingInput.selectedIndex = 0;
            ratingInput.value = '';
        }

    }


    // =========================================
    // REMOVE REVIEW MESSAGE
    // =========================================

    function clearReviewMessage() {

        const reviewMessages =
            reviewModal.querySelector(
                '.review-messages'
            );

        if (reviewMessages) {
            reviewMessages.remove();
        }

    }


    // =========================================
    // CLOSE MODAL
    // =========================================

    function closeReviewModal() {

        reviewModal.style.display = 'none';

        document.body.style.overflow = 'auto';


        clearReviewForm();

        clearReviewMessage();

    }


    // =========================================
    // OPEN MODAL
    // =========================================

    function openReviewModal() {

        reviewModal.style.display = 'flex';

        document.body.style.overflow = 'hidden';

    }


    // =========================================
    // OPEN BUTTON
    // =========================================

    openBtn.addEventListener('click', () => {

        openReviewModal();

    });


    // =========================================
    // CLOSE BUTTON
    // =========================================

    closeBtn.addEventListener('click', () => {

        closeReviewModal();

    });


    // =========================================
    // CLICK OUTSIDE MODAL
    // =========================================

    reviewModal.addEventListener('click', (e) => {

        if (e.target === reviewModal) {

            closeReviewModal();

        }

    });


    // =========================================
    // ESCAPE KEY
    // =========================================

    document.addEventListener('keydown', (e) => {

        if (
            e.key === 'Escape' &&
            reviewModal.style.display === 'flex'
        ) {

            closeReviewModal();

        }

    });


    // =========================================
    // CHECK FOR REVIEW MESSAGE
    // =========================================

    const reviewError =
        document.querySelector(
            '.review-error'
        );

    const reviewSuccess =
        document.querySelector(
            '.review-success'
        );


    // =========================================
    // REOPEN MODAL AFTER SUBMISSION
    // =========================================

    if (
        reviewError ||
        reviewSuccess
    ) {

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

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {

        document.body.classList.toggle('light-mode');

        const isLight = document.body.classList.contains('light-mode');

        if (isLight) {

            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');

        } else {

            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');

        }

    });

}



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
        footerYear.innerHTML =
            `© ${new Date().getFullYear()} Congo. Made with <span class="heart">♥</span>`;
    }

    console.log('DJ Congo website initialized — professional edition');

});














