/**
 * wishlist.js - Manages Wishlist functionality
 * 
 * Features:
 * - Persists to localStorage
 * - Toggles items (Add/Remove)
 * - Updates Heart Icon state visually
 * - Renders Wishlist Drawer
 */

const WISHLIST_STORAGE_KEY = 'baelio-wishlist';

// Default state used if nothing in storage
let wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];

// =========================================
// Core Logic
// =========================================

/**
 * Toggles a product in the wishlist
 * @param {Object} product - { code, name, category, image? }
 */
function toggleWishlist(product) {
    const index = wishlist.findIndex(item => item.code === product.code);

    if (index === -1) {
        // Add
        wishlist.push(product);
        showToast(`❤️ ${product.name} agregado a favoritos`);
    } else {
        // Remove
        wishlist.splice(index, 1);
        showToast(`💔 ${product.name} eliminado de favoritos`);
    }

    saveWishlist();
    updateWishlistUI();
}

function saveWishlist() {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

/**
 * Checks if a product is in wishlist
 */
function isInWishlist(code) {
    return wishlist.some(item => item.code === code);
}

// =========================================
// UI Logic
// =========================================

/**
 * Updates all UI elements related to wishlist
 * 1. Heart icons on product cards
 * 2. Wishlist count badge (if we have one)
 * 3. Renders the Wishlist Drawer items if open
 */
function updateWishlistUI() {
    // 1. Update Heart Icons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const code = btn.dataset.code;
        if (isInWishlist(code)) {
            btn.classList.add('active');
            btn.innerHTML = '❤️'; // Filled
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '🤍'; // Outline (using white heart for now, or SVG)
        }
    });

    // 2. Update Badge (Optional, using cart badge style)
    const wishlistBadge = document.querySelector('.wishlist-count');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
        wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }

    // 3. Render Drawer Content
    renderWishlistDrawer();
}

function renderWishlistDrawer() {
    const container = document.querySelector('.wishlist-items');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Tu lista de deseos está vacía.</div>';
        return;
    }

    container.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.code} - ${item.name}</h4>
                <p>${getCategoryName(item.category)}</p>
                <div class="cart-item-controls" style="margin-top: 5px;">
                     <button onclick="addToCart('${item.code}', '${item.name.replace(/'/g, "\\'")}', '${item.category}')" class="btn-micro" title="Mover al Carrito">🛒</button>
                </div>
            </div>
            <button class="remove-item" onclick="toggleWishlist({code: '${item.code}', name: '${item.name.replace(/'/g, "\\'")}'})">🗑️</button>
        </div>
    `).join('');
}


// =========================================
// Initialization & HTML Injection
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    injectWishlistUI();
    updateWishlistUI();
});

function injectWishlistUI() {
    // 1. Create Floating Button (Left side to distinguish from Cart)
    const floatBtn = document.createElement('div');
    floatBtn.className = 'wishlist-float-btn';
    floatBtn.innerHTML = `
        <span class="wishlist-icon">❤️</span>
        <span class="wishlist-count">0</span>
    `;
    floatBtn.onclick = toggleWishlistDrawer;
    document.body.appendChild(floatBtn);

    // 2. Create Drawer
    const drawer = document.createElement('div');
    drawer.className = 'wishlist-drawer';
    drawer.innerHTML = `
        <div class="cart-header">
            <h3>Mis Favoritos ❤️</h3>
            <button class="close-cart" onclick="toggleWishlistDrawer()">×</button>
        </div>
        <div class="wishlist-items cart-items">
            <!-- Items go here -->
        </div>
    `;
    document.body.appendChild(drawer);

    // 3. Create Overlay (Reusing cart overlay if possible, or new one)
    if (!document.querySelector('.cart-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.onclick = () => {
            toggleCart(); // Close cart if open
            toggleWishlistDrawer(); // Close wishlist if open
        };
        document.body.appendChild(overlay);
    } else {
        // Attach click listener to existing overlay to also close wishlist
        const overlay = document.querySelector('.cart-overlay');
        const oldOnclick = overlay.onclick;
        overlay.onclick = () => {
            if (oldOnclick) oldOnclick();
            document.querySelector('.wishlist-drawer').classList.remove('active');
            overlay.classList.remove('active');
        };
    }
}

function toggleWishlistDrawer() {
    const drawer = document.querySelector('.wishlist-drawer');
    const overlay = document.querySelector('.cart-overlay');

    // Close Cart if open
    const cartDrawer = document.querySelector('.cart-drawer');
    if (cartDrawer && cartDrawer.classList.contains('active')) {
        cartDrawer.classList.remove('active');
    }

    drawer.classList.toggle('active');
    overlay.classList.toggle('active');

    if (drawer.classList.contains('active')) {
        renderWishlistDrawer();
    }
}

// getCategoryName: uses global version from products-data.js
