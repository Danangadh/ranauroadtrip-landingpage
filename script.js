// ============================================================
// DATA EXPLORE – Destinasi Wisata Ranau
// ============================================================
const exploreData = [
    {
        id: 1,
        name: 'Air Terjun Niagara',
        location: 'Ranau',
        image: 'image/niagara.webp',
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
        name: 'Candle Light',
        location: 'Ranau',
        image: 'image/candlelight.webp',
        rating: 4.7,
        tag: '🏛️ Heritage',
        desc: 'Pusat keramaian dan kuliner khas.',
    },
    {
        id: 4,
        name: 'Banana Boat',
        location: 'Ranau',
        image: 'image/bananaboat.webp',
        rating: 4.9,
        tag: 'Sport',
        desc: 'Watersport, adrenalin, keseruan.',
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
        name: 'Beach Yoga ',
        location: 'Ranau',
        image: 'image/yoga.webp',
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
        image: 'image/jetski.webp',
        rating: 4.5,
        tag: '🛥️ Jetski',
        desc: 'Sensasi kecepatan di atas air.',
    },
];

// ============================================================
// DATA TESTIMONI
// ============================================================
const testimonials = [
    {
        id: 1,
        name: 'Andi Pratama',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
        rating: 5,
        comment: 'Pengalaman luar biasa! Pelayanan ramah dan pemandangan memukau.',
    },
    {
        id: 2,
        name: 'Siti Rahayu',
        photo: 'https://randomuser.me/api/portraits/women/2.jpg',
        rating: 4.8,
        comment: 'Pantai Bidadari sungguh indah, cocok untuk liburan keluarga.',
    },
    {
        id: 3,
        name: 'Budi Santoso',
        photo: 'https://randomuser.me/api/portraits/men/3.jpg',
        rating: 4.9,
        comment: 'Rafting di Ranau sangat seru! Guide profesional dan aman.',
    },
    {
        id: 4,
        name: 'Dewi Lestari',
        photo: 'https://randomuser.me/api/portraits/women/4.jpg',
        rating: 5,
        comment: 'Air Terjun Subik Tuha keren abis! Alam masih asri.',
    },
    {
        id: 5,
        name: 'Rizky Fadillah',
        photo: 'https://randomuser.me/api/portraits/men/5.jpg',
        rating: 4.7,
        comment: 'Paddleboard sambil menikmati sunset, pengalaman tak terlupakan.',
    },
    {
        id: 6,
        name: 'Maya Sari',
        photo: 'https://randomuser.me/api/portraits/women/6.jpg',
        rating: 4.6,
        comment: 'Paket wisata lengkap dan harga terjangkau. Puas banget!',
    },
];

// ============================================================
// RENDER TESTIMONI (Slider)
// ============================================================
let testimonialIndex = 0;
let testimonialInterval = null;

function renderTestimonials() {
    const container = document.getElementById('testimonialSlider');
    if (!container) return;

    // Buat wrapper untuk slide
    let slidesHtml = '';
    const cardsPerSlide = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);

    for (let i = 0; i < testimonials.length; i += cardsPerSlide) {
        const chunk = testimonials.slice(i, i + cardsPerSlide);
        slidesHtml += `<div class="testimonial-slide">`;
        chunk.forEach(item => {
            const stars = '★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating));
            slidesHtml += `
                <div class="testimonial-card">
                    <img src="${item.photo}" alt="${item.name}" class="testimonial-photo" />
                    <div class="testimonial-info">
                        <h4>${item.name}</h4>
                        <div class="testimonial-rating">${stars}</div>
                        <p>${item.comment}</p>
                    </div>
                </div>
            `;
        });
        slidesHtml += `</div>`;
    }

    container.innerHTML = slidesHtml;

    // Tambahkan dot indikator
    const dotsContainer = document.getElementById('testimonialDots');
    if (dotsContainer) {
        const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToTestimonialSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    goToTestimonialSlide(0);
    startTestimonialAutoplay();
}

function goToTestimonialSlide(index) {
    const container = document.getElementById('testimonialSlider');
    if (!container) return;
    const slides = container.querySelectorAll('.testimonial-slide');
    if (!slides.length) return;

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    testimonialIndex = index;

    container.style.transform = `translateX(-${testimonialIndex * 100}%)`;

    // Update dots
    const dots = document.querySelectorAll('#testimonialDots .dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === testimonialIndex);
    });
}

function nextTestimonial() {
    const slides = document.querySelectorAll('#testimonialSlider .testimonial-slide');
    if (slides.length) goToTestimonialSlide(testimonialIndex + 1);
}

function prevTestimonial() {
    const slides = document.querySelectorAll('#testimonialSlider .testimonial-slide');
    if (slides.length) goToTestimonialSlide(testimonialIndex - 1);
}

function startTestimonialAutoplay() {
    if (testimonialInterval) clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    }
}

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
    renderTestimonials(); 
    
    // Perbaikan navigasi (harus dipanggil setelah render)
    initNavigationFix();
    initMobileMenuFixed();
    
    initNavbarScroll();
    initScrollReveal();
    
    // Mulai carousel
    goToSlide(0);
    startAutoplay();
    
    // Event listener untuk tombol testimoni
    const prevTesti = document.getElementById('testiPrev');
    const nextTesti = document.getElementById('testiNext');
    if (prevTesti) {
        prevTesti.addEventListener('click', () => {
            stopTestimonialAutoplay();
            prevTestimonial();
            startTestimonialAutoplay();
        });
    }
    if (nextTesti) {
        nextTesti.addEventListener('click', () => {
            stopTestimonialAutoplay();
            nextTestimonial();
            startTestimonialAutoplay();
        });
    }

    // Hentikan autoplay saat hover
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopTestimonialAutoplay);
        sliderContainer.addEventListener('mouseleave', startTestimonialAutoplay);
    }
});


console.log('🚀 RanauRoadTrip siap! Navigasi sudah diperbaiki.');