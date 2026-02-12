/**
 * filters.js - Advanced Filtering Logic
 * 
 * Features:
 * - Extracts "Notes" from product descriptions
 * - Renders filter tags/chips
 * - Manages filter state
 */

let activeNoteFilters = [];

/**
 * Extracts unique notes from a list of products
 * Assumes description format: "Notas: Vainilla, Jazmín, etc. Ideal para: ..."
 */
function extractUniqueNotes(products) {
    const notesSet = new Set();

    products.forEach(product => {
        // Extract text between "Notas:" and "Ideal para:" or end of string
        const match = product.description.match(/Notas:\s*(.*?)(?:\.|Ideal para:|$)/i);
        if (match && match[1]) {
            // Split by comma, trim, and capitalize
            const notes = match[1].split(',').map(n => n.trim());
            notes.forEach(note => {
                // Formatting: capitalize first letter, cleaner text
                const cleanNote = note.charAt(0).toUpperCase() + note.slice(1).toLowerCase();
                if (cleanNote.length > 2) { // Avoid garbage
                    notesSet.add(cleanNote);
                }
            });
        }
    });

    return Array.from(notesSet).sort();
}

/**
 * Renders filter tags into a container
 * @param {string[]} notes - List of available notes
 * @param {Function} onFilterChange - Callback when filter changes
 */
function renderAdvancedFiltersUi(notes, onFilterChange) {
    // Inject container if not exists (usually insert after the main .filter-container)
    let container = document.getElementById('advancedFilters');

    if (!container) {
        // Try to find a reference element
        const filterButtons = document.querySelector('.filter-buttons');
        const searchContainer = document.querySelector('.search-container');
        const controls = document.querySelector('.controls');

        container = document.createElement('div');
        container.id = 'advancedFilters';
        container.className = 'advanced-filters-scroll';

        if (filterButtons) {
            filterButtons.after(container);
        } else if (searchContainer) {
            // If no filter buttons, put before search (or after, depending on layout preference)
            // Let's put it before search to mimic index layout
            searchContainer.parentNode.insertBefore(container, searchContainer);
        } else if (controls) {
            controls.prepend(container);
        } else {
            console.warn('Advanced Filters: No suitable container found (.filter-buttons, .search-container, or .controls)');
            return;
        }
    }

    // Determine "Popular" notes to show first or show all? 
    // For now, show top 15 most frequent would be complex without frequency map.
    // Let's show all for now, horiz scroll.

    container.innerHTML = notes.map(note => `
        <button class="filter-chip ${activeNoteFilters.includes(note) ? 'active' : ''}" 
                onclick="toggleNoteFilter('${note}')">
            ${note}
        </button>
    `).join('');

    // Store callback globally or dispatch event
    window.handleFilterChange = onFilterChange;
}

function toggleNoteFilter(note) {
    if (activeNoteFilters.includes(note)) {
        activeNoteFilters = activeNoteFilters.filter(n => n !== note);
    } else {
        activeNoteFilters.push(note);
    }

    // Create visual update
    renderAdvancedFiltersUi(currentAvailableNotes, window.handleFilterChange); // Re-render to update classes

    // Trigger main render
    if (window.handleFilterChange) window.handleFilterChange();
}

/**
 * Checks if a product matches the active filters
 * Logic: Product must contain ANY of the selected notes? Or ALL?
 * Usually "OR" is better for tags (Vainilla OR Chocolate). "AND" is too restrictive.
 */
function productMatchesNotes(product) {
    if (activeNoteFilters.length === 0) return true;

    const match = product.description.match(/Notas:\s*(.*?)(?:\.|Ideal para:|$)/i);
    if (!match || !match[1]) return false;

    const productNotes = match[1].toLowerCase();

    // Return true if product has AT LEAST ONE of the selected notes
    return activeNoteFilters.some(filter => productNotes.includes(filter.toLowerCase()));
}

// Global variable to store current available notes for re-rendering
let currentAvailableNotes = [];

/**
 * Initialize filters for a page
 */
function initAdvancedFilters(products, renderCallback) {
    currentAvailableNotes = extractUniqueNotes(products);
    renderAdvancedFiltersUi(currentAvailableNotes, renderCallback);
}
