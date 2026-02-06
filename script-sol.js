// ===================================
// BAELIO 2026 - Sol de Janeiro Inspired
// ===================================

const allProducts = [
    // LÍNEA SOL DE JANEIRO INSPIRED (S01-S05) MATCHING USER IMAGE
    { code: 'S01', name: 'LAVIT 76', category: 'sol', color: 'amarillo', sizes: '100ml', description: 'Notas: Ámbar, flores exóticas. Inspirado en Sol de Janeiro.' }, // Image says: Amarillo/Ámbar
    { code: 'S02', name: 'LAVIT 59', category: 'sol', color: 'fucsia', sizes: '100ml', description: 'Notas: Orquídea, azúcar violeta. Inspirado en Sol de Janeiro.' }, // Image says: Rosado/Fucsia
    { code: 'S03', name: 'LAVIT 71', category: 'sol', color: 'morado', sizes: '100ml', description: 'Notas: Vainilla caramelizada, nuez de macadamia. Inspirado en Sol de Janeiro.' }, // Image says: Morado/Lila
    { code: 'S04', name: 'LAVIT 62', category: 'sol', color: 'coral', sizes: '100ml', description: 'Notas: Pistacho, caramelo salado. Inspirado en Sol de Janeiro.' }, // Image says: Rojo/Coral
    { code: 'S05', name: 'LAVIT 68', category: 'sol', color: 'turquesa', sizes: '100ml', description: 'Notas: Jazmín brasileño, fruta del dragón. Inspirado en Sol de Janeiro.' } // Image says: Turquesa
];

// Filter only Sol perfumes
const products = allProducts.filter(p => p.category === 'sol');

// ===================================
// Helper function to get image by category
// ===================================
function getProductImage(category) {
    return 'images/women.png'; // Not used due to CSS styling
}

// ===================================
// State Management
// ===================================
let currentFilter = 'all';
let searchQuery = '';

// ===================================
// DOM Elements
// ===================================
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// ===================================
// Render Products
// ===================================
function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';

    productsGrid.innerHTML = filteredProducts.map((product, index) => {
        // Extract number from name (e.g. "LAVIT 76" -> "76")
        const number = product.name.replace('LAVIT ', '');

        return `
        <div class="product-card" ${product.color ? `data-color="${product.color}"` : ''} style="animation-delay: ${index * 0.05}s">
            <div class="product-image">
                <div class="bottle-cap"></div>
                <div class="bottle-body">
                    <div class="bottle-label">
                        <div class="label-diamond"></div>
                        <div class="label-content">
                            <span class="label-brand">LAVIT</span>
                            <span class="label-edition">EDICIÓN CARNAVAL</span>
                            <span class="label-number">${number}</span>
                            <span class="label-type">BODY MIST</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-header">
                <span class="product-code">${product.code}</span>
                <span class="product-category category-${product.category}">Línea Sol Inspired</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-colors" style="text-transform: capitalize; color: #888; font-size: 0.9rem;">${product.color}</p>
            <p class="product-sizes"><strong>Tamaños:</strong> ${product.sizes}</p>
            <button class="product-btn" onclick="contactWhatsApp('${product.code}', '${product.name}')">
                Consultar por WhatsApp
            </button>
        </div>
    `}).join('');
}

// ===================================
// Helper Functions
// ===================================
function getCategoryName(category) {
    return 'Línea Sol';
}

function contactWhatsApp(code, name) {
    const message = encodeURIComponent(`Hola! Me interesa el perfume ${code} - ${name} de la Línea Sol. ¿Podrías darme más información?`);
    const phoneNumber = '1234567890'; // Reemplazar con tu número de WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// ===================================
// Event Listeners
// ===================================

// Search input
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// Smooth scroll for navigation links
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

// ===================================
// Scroll Animation Observer
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements after products render
    setTimeout(() => {
        const elements = document.querySelectorAll('.product-card, .footer-section, .hero-content');
        elements.forEach(el => {
            el.classList.add('fade-in-section');
            observer.observe(el);
        });
    }, 100);

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Mobile Menu Logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
});

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
