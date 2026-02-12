// ===================================
// BAELIO 2026 — Main Application Logic
// Shared rendering, filtering, search,
// season filter, pagination, and interactions.
// ===================================

(function () {
    'use strict';

    // ─── State ───
    let currentFilter = 'all';
    let searchQuery = '';
    let currentSeasonFilter = 'all';
    let products = [];
    let currentPage = 1;
    const PRODUCTS_PER_PAGE = 24;

    // ─── DOM References (set on DOMContentLoaded) ───
    let productsGrid, noResults, searchInput, productCounter;

    // ─── Determine which products to show ───
    function getPageProducts() {
        const config = getPageConfig();
        if (!config.categories) {
            // Index page — show all products
            return window.ALL_PRODUCTS;
        }
        return window.ALL_PRODUCTS.filter(p => config.categories.includes(p.category));
    }

    // ─── Season extraction from descriptions ───
    function extractSeason(description) {
        const desc = description.toLowerCase();
        if (desc.includes('todo el año')) return 'todo';
        if (desc.includes('primavera-verano') || desc.includes('primavera') || desc.includes('verano')) return 'primavera-verano';
        if (desc.includes('otoño-invierno') || desc.includes('otoño') || desc.includes('invierno')) return 'otoño-invierno';
        return 'todo';
    }

    // ─── Season Filter UI ───
    function injectSeasonFilter() {
        const controls = document.querySelector('.controls');
        if (!controls) return;

        const seasonHTML = `
        <div class="season-filter" role="group" aria-label="Filtrar por temporada">
            <button class="season-chip active" data-season="all">🌍 Todas</button>
            <button class="season-chip" data-season="primavera-verano">☀️ Primavera-Verano</button>
            <button class="season-chip" data-season="otoño-invierno">❄️ Otoño-Invierno</button>
            <button class="season-chip" data-season="todo">🔄 Todo el Año</button>
        </div>`;
        controls.insertAdjacentHTML('beforeend', seasonHTML);

        controls.addEventListener('click', (e) => {
            const chip = e.target.closest('.season-chip');
            if (!chip) return;
            document.querySelectorAll('.season-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentSeasonFilter = chip.dataset.season;
            currentPage = 1;
            renderProducts();
        });
    }

    // ─── Product Counter ───
    function injectProductCounter() {
        const controls = document.querySelector('.controls');
        if (!controls) return;

        const counterEl = document.createElement('div');
        counterEl.id = 'product-counter';
        counterEl.className = 'product-counter';
        counterEl.setAttribute('aria-live', 'polite');
        controls.appendChild(counterEl);
        productCounter = counterEl;
    }

    function updateProductCounter(shown, total) {
        if (productCounter) {
            productCounter.textContent = `Mostrando ${shown} de ${total} productos`;
        }
    }

    // ─── Skeleton Loading ───
    function showSkeleton() {
        if (!productsGrid) return;
        const skeletons = Array(6).fill(`
        <div class="product-card skeleton-card" aria-hidden="true">
            <div class="skeleton-image"></div>
            <div class="skeleton-line skeleton-line-short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line skeleton-line-long"></div>
        </div>`).join('');
        productsGrid.innerHTML = skeletons;
    }

    // ─── Sol Bottle Rendering ───
    function renderSolCard(product, index) {
        const number = product.name.replace('LAVIT ', '');
        return `
        <div class="product-card product-card-clickable" ${product.color ? `data-color="${product.color}"` : ''} style="animation-delay: ${index * 0.05}s" onclick="openProductModal('${product.code}')" role="button" tabindex="0" aria-label="Ver detalle de ${product.name}">
            <button class="wishlist-btn" data-code="${product.code}" onclick="event.stopPropagation(); toggleWishlist({code: '${product.code}', name: '${product.name.replace(/'/g, "\\'")}', category: '${product.category}'})">
                🤍
            </button>
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
            <p class="product-colors" style="text-transform: capitalize; color: #888; font-size: 0.9rem;">${product.color || ''}</p>
            <p class="product-sizes"><strong>Tamaños:</strong> ${product.sizes}</p>
            <button class="product-btn" onclick="event.stopPropagation(); addToCart('${product.code}', '${product.name.replace(/'/g, "\\'")}', '${product.category}')">
                Agregar al Carrito
            </button>
        </div>`;
    }

    // ─── Standard Card Rendering ───
    function renderStandardCard(product, index) {
        return `
        <div class="product-card product-card-clickable" ${product.gender ? `data-gender="${product.gender}"` : ''} style="animation-delay: ${index * 0.05}s" onclick="openProductModal('${product.code}')" role="button" tabindex="0" aria-label="Ver detalle de ${product.name}">
            <button class="wishlist-btn" data-code="${product.code}" onclick="event.stopPropagation(); toggleWishlist({code: '${product.code}', name: '${product.name.replace(/'/g, "\\'")}', category: '${product.category}'})">
                🤍
            </button>
            ${generateProductImageHTML(product)}
            <div class="product-header">
                <span class="product-code">${product.code}</span>
                <span class="product-category category-${product.category}">${getCategoryName(product.category)}</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-sizes"><strong>Tamaños:</strong> ${product.sizes}</p>
            <button class="product-btn" onclick="event.stopPropagation(); addToCart('${product.code}', '${product.name.replace(/'/g, "\\'")}', '${product.category}')">
                Agregar al Carrito
            </button>
        </div>`;
    }

    // ─── Main Render Function ───
    function renderProducts() {
        if (!productsGrid || !noResults) return;

        const filteredProducts = products.filter(product => {
            const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesNotes = typeof productMatchesNotes === 'function' ? productMatchesNotes(product) : true;
            const matchesSeason = currentSeasonFilter === 'all' || extractSeason(product.description) === currentSeasonFilter;
            return matchesCategory && matchesSearch && matchesNotes && matchesSeason;
        });

        if (filteredProducts.length === 0) {
            productsGrid.style.display = 'none';
            noResults.style.display = 'block';
            updateProductCounter(0, products.length);
            return;
        }

        productsGrid.style.display = 'grid';
        noResults.style.display = 'none';

        // Pagination
        const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
        if (currentPage > totalPages) currentPage = totalPages;
        const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const pageProducts = filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

        productsGrid.innerHTML = pageProducts.map((product, index) => {
            if (product.category === 'sol') {
                return renderSolCard(product, index);
            }
            return renderStandardCard(product, index);
        }).join('');

        updateProductCounter(pageProducts.length, filteredProducts.length);

        // Update wishlist heart states
        if (typeof updateWishlistUI === 'function') {
            updateWishlistUI();
        }

        // Pagination controls
        renderPagination(filteredProducts.length, totalPages);
    }

    // ─── Pagination ───
    function renderPagination(totalItems, totalPages) {
        let paginationEl = document.getElementById('pagination-controls');
        if (!paginationEl) {
            const catalog = document.querySelector('.catalog .container');
            if (!catalog) return;
            paginationEl = document.createElement('div');
            paginationEl.id = 'pagination-controls';
            paginationEl.className = 'pagination';
            catalog.appendChild(paginationEl);
        }

        if (totalPages <= 1) {
            paginationEl.style.display = 'none';
            return;
        }
        paginationEl.style.display = 'flex';

        let buttonsHTML = '';
        // Prev
        buttonsHTML += `<button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''} onclick="window.__changePage(${currentPage - 1})">‹</button>`;

        // Page numbers (show up to 5 around current)
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        if (start > 1) buttonsHTML += `<button class="pagination-btn" onclick="window.__changePage(1)">1</button>`;
        if (start > 2) buttonsHTML += `<span class="pagination-ellipsis">…</span>`;

        for (let i = start; i <= end; i++) {
            buttonsHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="window.__changePage(${i})">${i}</button>`;
        }

        if (end < totalPages - 1) buttonsHTML += `<span class="pagination-ellipsis">…</span>`;
        if (end < totalPages) buttonsHTML += `<button class="pagination-btn" onclick="window.__changePage(${totalPages})">${totalPages}</button>`;

        // Next
        buttonsHTML += `<button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.__changePage(${currentPage + 1})">›</button>`;

        paginationEl.innerHTML = buttonsHTML;
    }

    window.__changePage = function (page) {
        currentPage = page;
        renderProducts();
        // Scroll to top of catalog
        const catalog = document.getElementById('catalogo');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // ─── Category Filter Buttons (for index page) ───
    function initCategoryFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.category;
                currentPage = 1;
                renderProducts();
            });
        });
    }

    // ─── Search ───
    function initSearch() {
        if (!searchInput) return;
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            currentPage = 1;
            renderProducts();
        });
    }

    // ─── Mobile Menu ───
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav');
        if (!menuBtn || !nav) return;

        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', expanded);
            menuBtn.textContent = expanded ? '✕' : '☰';
        });

        // Close menu on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.textContent = '☰';
            });
        });
    }

    // ─── Scroll Animations (IntersectionObserver) ───
    function initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        // Observe hero, about, footer sections
        document.querySelectorAll('.hero-content, .about-content, .footer-content').forEach(el => {
            observer.observe(el);
        });
    }

    // ─── Parallax for hero ───
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < 600) {
                hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
            }
        }, { passive: true });
    }

    // ─── Smooth scroll for anchor links ───
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ─── Keyboard accessibility for clickable cards ───
    function initCardKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('product-card-clickable')) {
                e.target.click();
            }
        });
    }

    // ─── Global render function (for filters.js callback) ───
    window.renderProducts = function () {
        renderProducts();
    };

    // ─── Initialize Everything ───
    document.addEventListener('DOMContentLoaded', () => {
        productsGrid = document.getElementById('productsGrid');
        noResults = document.getElementById('noResults');
        searchInput = document.getElementById('searchInput');

        if (!productsGrid) return; // Not a catalog page (unlikely)

        products = getPageProducts();

        // Show skeleton briefly
        showSkeleton();

        // Init category filters (index page)
        initCategoryFilters();

        // Init search
        initSearch();

        // Init season filter
        injectSeasonFilter();

        // Init product counter
        injectProductCounter();

        // Init mobile menu
        initMobileMenu();

        // Init advanced note filters
        if (typeof initAdvancedFilters === 'function') {
            initAdvancedFilters(products, renderProducts);
        }

        // Render products (replaces skeleton)
        setTimeout(() => renderProducts(), 150); // Small delay for skeleton effect

        // Init animations
        initScrollAnimations();
        initParallax();
        initSmoothScroll();
        initCardKeyboard();
    });
})();
