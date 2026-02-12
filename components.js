// ===================================
// BAELIO 2026 — Shared UI Components
// Injects header, footer, modal, etc.
// ===================================

// ─── Page Configuration Map ───
const PAGE_CONFIG = {
    'index.html': { title: 'Inicio', navId: 'index', categories: null },
    'mujer.html': { title: 'Perfumes de Mujer', navId: 'mujer', categories: ['mujer'] },
    'hombre.html': { title: 'Perfumes de Hombre', navId: 'hombre', categories: ['hombre'] },
    'premium.html': { title: 'Línea Premium', navId: 'premium', categories: ['black-premium', 'red-premium'] },
    'teen.html': { title: 'Teen', navId: 'teen', categories: ['teen'] },
    'lavit.html': { title: 'Lavit Body Splash', navId: 'lavit', categories: ['lavit'] },
    'sol.html': { title: 'Línea Sol Inspired', navId: 'sol', categories: ['sol'] }
};

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return filename;
}

function getPageConfig() {
    return PAGE_CONFIG[getCurrentPage()] || PAGE_CONFIG['index.html'];
}

// ─── Header Injection ───
function injectHeader() {
    const config = getPageConfig();
    const currentPage = getCurrentPage();

    const navLinks = [
        { href: 'index.html', label: 'Inicio', id: 'index' },
        { href: 'mujer.html', label: 'Mujer', id: 'mujer' },
        { href: 'hombre.html', label: 'Hombre', id: 'hombre' },
        { href: 'premium.html', label: 'Premium', id: 'premium' },
        { href: 'teen.html', label: 'Teen', id: 'teen' },
        { href: 'lavit.html', label: 'Lavit', id: 'lavit' },
        { href: 'sol.html', label: 'Lavit Sol', id: 'sol' },
        { href: 'index.html#contacto', label: 'Contacto', id: 'contacto' }
    ];

    const navHTML = navLinks.map(link => {
        const isActive = link.id === config.navId ? ' active' : '';
        return `<a href="${link.href}" class="nav-link${isActive}" aria-label="Ir a ${link.label}">${link.label}</a>`;
    }).join('\n                    ');

    const headerEl = document.getElementById('site-header');
    if (headerEl) {
        headerEl.innerHTML = `
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <h1>BAELIO</h1>
                    <span class="logo-subtitle">2026</span>
                </div>
                <button class="mobile-menu-btn" aria-label="Abrir menú de navegación" aria-expanded="false">☰</button>
                <nav class="nav" role="navigation" aria-label="Navegación principal">
                    ${navHTML}
                </nav>
            </div>
        </div>`;
    }

    // Breadcrumbs (only on non-index pages)
    if (currentPage !== 'index.html') {
        const breadcrumbEl = document.getElementById('breadcrumbs');
        if (breadcrumbEl) {
            breadcrumbEl.innerHTML = `
            <div class="container">
                <nav class="breadcrumb" aria-label="Ruta de navegación">
                    <a href="index.html">Inicio</a>
                    <span class="breadcrumb-sep">›</span>
                    <span class="breadcrumb-current">${config.title}</span>
                </nav>
            </div>`;
        }
    }
}

// ─── Footer Injection ───
function injectFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3 class="footer-title">BAELIO</h3>
                <p class="footer-text">Tu destino para fragancias premium</p>
            </div>
            <div class="footer-section">
                <h4 class="footer-subtitle">Contacto</h4>
                <p class="footer-text">WhatsApp: <a href="https://wa.me/${window.WHATSAPP_NUMBER || '1234567890'}" class="footer-link">+1 234 567 890</a></p>
                <p class="footer-text">Email: <a href="mailto:info@baelio.com" class="footer-link">info@baelio.com</a></p>
            </div>
            <div class="footer-section">
                <h4 class="footer-subtitle">Horario</h4>
                <p class="footer-text">Lunes a Viernes: 9:00 - 18:00</p>
                <p class="footer-text">Sábados: 10:00 - 14:00</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 BAELIO. Todos los derechos reservados.</p>
        </div>
    </div>`;
}

// ─── Product Detail Modal ───
function injectProductModal() {
    const modalHTML = `
    <div id="product-modal" class="product-modal" role="dialog" aria-modal="true" aria-label="Detalle del producto" style="display:none;">
        <div class="product-modal-overlay" onclick="closeProductModal()"></div>
        <div class="product-modal-content">
            <button class="product-modal-close" onclick="closeProductModal()" aria-label="Cerrar">&times;</button>
            <div class="product-modal-body">
                <div class="product-modal-image" id="modal-image"></div>
                <div class="product-modal-info">
                    <div class="product-modal-header">
                        <span class="product-modal-code" id="modal-code"></span>
                        <span class="product-modal-category" id="modal-category"></span>
                    </div>
                    <h2 class="product-modal-name" id="modal-name"></h2>
                    <p class="product-modal-description" id="modal-description"></p>
                    <p class="product-modal-sizes" id="modal-sizes"></p>
                    <div class="product-modal-actions">
                        <button class="product-btn product-modal-cart-btn" id="modal-cart-btn">Agregar al Carrito</button>
                        <button class="product-modal-share-btn" id="modal-share-btn" aria-label="Compartir producto">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            Compartir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openProductModal(productCode) {
    const product = window.ALL_PRODUCTS.find(p => p.code === productCode);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    document.getElementById('modal-code').textContent = product.code;
    document.getElementById('modal-category').textContent = getCategoryName(product.category);
    document.getElementById('modal-category').className = `product-modal-category category-${product.category}`;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-sizes').innerHTML = `<strong>Tamaños:</strong> ${product.sizes}`;

    // Image
    const imageContainer = document.getElementById('modal-image');
    if (product.category === 'sol') {
        const number = product.name.replace('LAVIT ', '');
        imageContainer.innerHTML = `
        <div class="product-image" ${product.color ? `data-color="${product.color}"` : ''}>
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
        </div>`;
    } else {
        imageContainer.innerHTML = generateProductImageHTML(product);
    }

    // Cart btn
    const cartBtn = document.getElementById('modal-cart-btn');
    cartBtn.onclick = () => addToCart(product.code, product.name, product.category);

    // Share btn
    const shareBtn = document.getElementById('modal-share-btn');
    shareBtn.onclick = () => shareProduct(product);

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Close on Escape
    document.addEventListener('keydown', handleModalEscape);
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalEscape);
}

function handleModalEscape(e) {
    if (e.key === 'Escape') closeProductModal();
}

// ─── Share Product ───
function shareProduct(product) {
    const text = `🌟 ${product.name} (${product.code}) — ${getCategoryName(product.category)}\n${product.description}\n\nVer en: ${window.location.origin}/${getCurrentPage()}`;

    if (navigator.share) {
        navigator.share({ title: product.name, text: text }).catch(() => { });
    } else {
        // Fallback: WhatsApp
        const waURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(waURL, '_blank');
    }
}

// ─── Back to Top Button ───
function injectBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top-btn';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.style.display = 'none';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }, { passive: true });
}

// ─── Toast notification (reusable) ───
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── Init all components ───
function initComponents() {
    injectHeader();
    injectFooter();
    injectProductModal();
    injectBackToTop();
}

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', initComponents);
