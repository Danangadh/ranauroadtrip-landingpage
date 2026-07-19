
const exploreData = [
    {
        id: 1,
        name: 'Air Terjun Niagara',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
        rating: 4.9,
        tag: ' Terpopuler',
        desc: 'Air Terjun.',
    },
    {
        id: 2,
        name: 'Pantai Bidadari',
        location: 'Ranau',
        image: 'pantai-bidadari.jpeg',
        rating: 4.8,
        tag: ' Eksotis',
        desc: 'Pantai, Sunset, Paddleboard, Yoga',
    },
    {
        id: 3,
        name: 'Alun-Alun Danau Ranau',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1547844149-7c2c5c0f3b6d?w=600&h=400&fit=crop',
        rating: 4.7,
        tag: ' Heritage',
        desc: 'Pusat Keramaian',
    },
    {
        id: 4,
        name: 'Pantai Pati Marga',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1506765515384-028b60b970df?w=600&h=400&fit=crop',
        rating: 4.9,
        tag: 'Pantai',
        desc: 'Pantai, Sunset',
    },
    {
        id: 5,
        name: 'Rafting',
        location: 'Ranau',
        image: 'rafting.jpeg',
        rating: 4.6,
        tag: 'Sport',
        desc: 'Olahraga air, Petualangan, Adrenalin',
    },
    {
        id: 6,
        name: 'Air Terjun Subik Tuha',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
        rating: 4.5,
        tag: 'Waterfall',
        desc: 'Air Terjun, Alam, Petualangan',
    },

     {
        id: 6,
        name: 'Paddleboard',
        location: 'Ranau',
        image: 'paddleboard.jpeg',
        rating: 4.5,
        tag: 'Paddleboard',
        desc: 'Wahana Air, Alam, Petualangan',
    },
     {
        id: 6,
        name: 'Jetski',
        location: 'Ranau',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
        rating: 4.5,
        tag: 'Waterfall',
        desc: 'Air Terjun, Alam, Petualangan',
    },
];

// ============================================================
// RENDER EXPLORE (8 Destinasi dengan Card Modern)
// ============================================================
function renderExplore() {
    const grid = document.getElementById('exploreGrid');
    if (!grid) return;

    grid.innerHTML = exploreData
        .map(
            (item) => `
                <div class="explore-card" style="background-image: url('${item.image}');">
                    <div class="explore-card-overlay">
                        <span class="explore-tag">${item.tag}</span>
                        <h3 class="explore-name">${item.name}</h3>
                        <p class="explore-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                        <div class="explore-rating">
                            <span>⭐ ${item.rating}</span>
                        </div>
                        <p class="explore-desc">${item.desc}</p>
                        <a href="#deals" class="explore-btn">Pesan Sekarang</a>
                    </div>
                </div>
            `
        )
        .join('');
}

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
// 3. CAROUSEL
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

    // Geser container slides
    const slidesContainer = document.getElementById('carouselSlides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
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

// Event listeners
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
// 4. MOBILE MENU
// ============================================================

function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// ============================================================
// 5. NAVBAR SCROLL EFFECT
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
// 6. SCROLL REVEAL
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
// 7. INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    renderExplore();
    renderDeals();
    initMobileMenu();
    initNavbarScroll();
    initScrollReveal();
    // Mulai carousel di slide pertama
    goToSlide(0);
    startAutoplay();
});

console.log('🚀 TravelExplore dengan slider hero siap!');