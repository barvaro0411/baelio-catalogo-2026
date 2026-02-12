/**
 * Generates the HTML for the product image, using <picture> for WebP support
 * and lazy loading. Handles fallback to CSS art for specific categories.
 * 
 * @param {Object} product - The product object
 * @returns {string} HTML string for the product image container
 */
function generateProductImageHTML(product) {
    // Categories that use restricted CSS art or standard background images (Teen, Sol, Lavit)
    // We return an empty div to let CSS handle it, or specific HTML for Sol/Lavit if needed.
    // Note: Sol and Lavit have their own specific render logic in their specific scripts usually,
    // but if specific scripts use this helper, we should handle it.

    // Teen uses complex CSS filters on background-image, so we keep it as is (empty div)
    if (product.category === 'teen') {
        return `<div class="product-image"></div>`;
    }

    // Sol and Lavit use complex HTML structures often rendered directly in the loop.
    // If we are called for these, we might assume the caller handles the inner content or we return basic div.
    if (['sol', 'lavit'].includes(product.category)) {
        return `<div class="product-image"></div>`;
    }

    // Determine base image name
    let baseImage = 'women';

    if (product.category === 'hombre') {
        baseImage = 'men';
    } else if (product.category === 'black-premium') {
        baseImage = 'premium';
        // Exception: Premium women's perfumes use women bottle
        if (product.gender === 'mujer') {
            baseImage = 'women';
        }
    } else if (product.category === 'red-premium') {
        baseImage = 'women'; // Red premium uses women bottle per CSS
    }

    // Return picture tag structure
    // We use the same class .product-image but now it contains an img
    // We added styles to styles.css to handle img inside .product-image
    return `
    <div class="product-image">
        <picture>
            <source srcset="images/${baseImage}-medium.webp" type="image/webp">
            <img src="images/${baseImage}.png" alt="${product.name}" loading="lazy" width="300" height="300">
        </picture>
    </div>
    `;
}
