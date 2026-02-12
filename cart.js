/**
 * Shopping Cart Logic for BAELIO 2026
 * Handles adding/removing items, persistence, and WhatsApp checkout.
 */

const CART_STORAGE_KEY = 'baelio_cart_v1';
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

// ===================================
// UI Injection
// ===================================
function injectCartUI() {
    const cartHTML = `
    <!-- Floating Cart Button -->
    <div id="cart-float-btn" class="cart-float-btn" onclick="toggleCart()">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
        <span id="cart-badge" class="cart-badge">0</span>
    </div>

    <!-- Cart Sidebar/Drawer -->
    <div id="cart-drawer" class="cart-drawer">
        <div class="cart-header">
            <h3>Tu Carrito</h3>
            <button class="close-cart" onclick="toggleCart()">✕</button>
        </div>
        <div id="cart-items" class="cart-items">
            <!-- Items will be injected here -->
            <div class="empty-cart-msg">Tu carrito está vacío</div>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cart-total-price">Consultar</span>
            </div>
            <button class="checkout-btn" onclick="checkoutWhatsApp()">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                Enviar Pedido por WhatsApp
            </button>
        </div>
    </div>
    <div id="cart-overlay" class="cart-overlay" onclick="toggleCart()"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartHTML);
    updateCartUI();
}

// ===================================
// Core Functions
// ===================================

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
}

function addToCart(code, name, category) {
    const existingItem = cart.find(item => item.code === code);

    if (existingItem) {
        existingItem.quantity += 1;
        showToast(`Cantidad de ${name} actualizada`);
    } else {
        cart.push({
            code,
            name,
            category,
            quantity: 1
        });
        showToast(`${name} agregado al carrito`);
    }

    saveCart();
    updateCartUI();
    // Open cart automatically on add? optional.
    // toggleCart(); 
}

function removeFromCart(code) {
    cart = cart.filter(item => item.code !== code);
    saveCart();
    updateCartUI();
}

function updateQuantity(code, delta) {
    const item = cart.find(item => item.code === code);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(code);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');

    // Update Badge
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío</div>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.code}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity('${item.code}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.code}', 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.code}')">✕</button>
        </div>
    `).join('');
}

function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let message = "Hola! Quiero realizar el siguiente pedido:\n\n";
    cart.forEach(item => {
        message += `• *${item.quantity}x* ${item.code} - ${item.name}\n`;
    });

    message += "\n¿Podrían indicarme el total y los medios de pago?";

    const phoneNumber = '56966221297';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Toast: uses global showToast from components.js

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    injectCartUI();
});
