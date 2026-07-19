// ============================================================
// DATA EXPLORE – Destinasi Wisata Ranau
// ============================================================
const exploreData = [
    {
        id: 1,
        name: 'Air Terjun Niagara',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
        rating: 4.9,
        tag: '⭐ Terpopuler',
        desc: 'Air Terjun indah dengan pemandangan hijau.',
    },
    {
        id: 2,
        name: 'Pantai Bidadari',
        location: 'Ranau',
        image: 'pantai-bidadari.jpeg',
        rating: 4.8,
        tag: '🏝️ Eksotis',
        desc: 'Pantai, Sunset, Paddleboard, Yoga',
    },
    {
        id: 3,
        name: 'Alun-Alun Danau Ranau',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1547844149-7c2c5c0f3b6d?w=600&h=400&fit=crop',
        rating: 4.7,
        tag: '🏛️ Heritage',
        desc: 'Pusat keramaian dan kuliner khas.',
    },
    {
        id: 4,
        name: 'Pantai Pati Marga',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1506765515384-028b60b970df?w=600&h=400&fit=crop',
        rating: 4.9,
        tag: '🏖️ Pantai',
        desc: 'Pantai eksklusif dengan sunset memukau.',
    },
    {
        id: 5,
        name: 'Rafting',
        location: 'Ranau',
        image: 'rafting.jpeg',
        rating: 4.6,
        tag: '🚣 Sport',
        desc: 'Olahraga air, petualangan, adrenalin.',
    },
    {
        id: 6,
        name: 'Air Terjun Subik Tuha',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
        rating: 4.5,
        tag: '💦 Waterfall',
        desc: 'Air terjun alami di tengah hutan.',
    },
    {
        id: 7,
        name: 'Paddleboard',
        location: 'Ranau',
        image: 'paddleboard.jpeg',
        rating: 4.5,
        tag: '🏄 Paddleboard',
        desc: 'Bermain paddleboard di danau yang tenang.',
    },
    {
        id: 8,
        name: 'Jetski',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
        rating: 4.5,
        tag: '🛥️ Jetski',
        desc: 'Sensasi kecepatan di atas air.',
    },
];

// ============================================================
// RENDER EXPLORE
// ============================================================
function renderExplore() {
    const grid = document.getElementById('exploreGrid');
    if (!grid) return;

    grid.innerHTML = exploreData
        .map(
            (item) => `
                <div class="explore-card" style="background-image: url('${item.image}');">
                    <div class="explore-card-overlay">
                        <span class="explore-tag">${item.tag || ''}</span>
                        <h3 class="explore-name">${item.name || ''}</h3>
                        <p class="explore-location"><i class="fas fa-map-marker-alt"></i> ${item.location || ''}</p>
                        <div class="explore-rating">
                            <span>⭐ ${item.rating || 0}</span>
                        </div>
                        <p class="explore-desc">${item.desc || ''}</p>
                        <a href="#deals" class="explore-btn">Pesan Sekarang</a>
                    </div>
                </div>
            `
        )
        .join('');
}

// ============================================================
// RENDER DEALS (sementara sebagai contoh)
// ============================================================
const dealsData = [
    { emoji: '🌴', destination: 'Bali', country: 'Indonesia', price: 799, badge: '🔥 Populer' },
    { emoji: '🌅', destination: 'Santorini', country: 'Yunani', price: 999, badge: '⭐ Favorit' },
    { emoji: '🏙️', destination: 'Dubai', country: 'UAE', price: 849, badge: '✨ Mewah' },
    { emoji: '🗼', destination: 'Paris', country: 'Prancis', price: 699, badge: '❤️ Romantis' },
];

function renderDeals() {
    const grid = document.getElementById('dealsGrid');
    if (!grid) return;
    grid.innerHTML = dealsData.map(item => `
        <div class="deal-card">
            <span class="badge-deal">${item.badge}</span>
            <span class="emoji">${item.emoji}</span>
            <div class="destination">${item.destination}</div>
            <div class="country">${item.country}</div>
            <div class="price">$${item.price} <small>/ orang</small></div>
        </div>
    `).join('');
}

// ============================================================
// CAROUSEL
// ============================================================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let autoplayInterval = null;

function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    const slidesContainer = document.getElementById('carouselSlides');
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });
}

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        if (!isNaN(index)) {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        }
    });
});

// ============================================================
// MOBILE MENU (Versi Lama – akan kita timpa dengan yang baru)
// ============================================================
function initMobileMenu() {
    // Fungsi ini akan digantikan oleh initMobileMenuFixed
    // Biarkan kosong agar tidak bentrok
}

// ============================================================
// PERBAIKAN NAVIGASI (FIX)
// ============================================================

function initNavigationFix() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Clone untuk menghapus event listener lama
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Tutup mobile menu jika terbuka
                    const navLinksContainer = document.querySelector('.nav-links');
                    if (navLinksContainer) {
                        navLinksContainer.classList.remove('active');
                        const toggle = document.getElementById('menuToggle');
                        if (toggle) {
                            const icon = toggle.querySelector('i');
                            if (icon) {
                                icon.className = 'fas fa-bars';
                            }
                        }
                    }
                    // Scroll ke target dengan smooth
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function initMobileMenuFixed() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    // Clone toggle untuk menghapus event listener lama
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    newToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    });

    // Tutup menu saat klik di luar navbar
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.navbar');
        if (nav && !nav.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = newToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
    });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
    const cards = document.querySelectorAll('.explore-card, .deal-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`;
        observer.observe(card);
    });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    renderExplore();
    renderDeals();
    
    // Perbaikan navigasi (harus dipanggil setelah render)
    initNavigationFix();
    initMobileMenuFixed();
    
    initNavbarScroll();
    initScrollReveal();
    
    // Mulai carousel
    goToSlide(0);
    startAutoplay();
});

console.log('🚀 RanauRoadTrip siap! Navigasi sudah diperbaiki.');