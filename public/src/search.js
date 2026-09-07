/*
    - Adds event listeners to tooltip checkboxes and search input
    - Shows tooltip upon filter icon being clicked
*/
document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.querySelector('.tooltip');
    const filterIcon = document.getElementById('filterIcon');

    if (filterIcon && tooltip) {
        filterIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            tooltip.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!tooltip.contains(e.target)) tooltip.classList.remove('show');
        });
    }

    const searchInput = document.getElementById('searchInput');
    const cardsParent = document.querySelector('.cards');
    const directoryRows = document.querySelector('.directory-rows');
    const filterCheckboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));

    function normalizeValue(value) {
        return (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function runLocationSearch() {
        if (!directoryRows || !searchInput) return;

        const searchedText = searchInput.value.toLowerCase().trim();
        const activeLocations = filterCheckboxes.filter(cb => cb.checked).map(cb => normalizeValue(cb.value));

        Array.from(directoryRows.children).forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const country = normalizeValue(row.dataset.country || '');
            const region = normalizeValue(row.dataset.region || '');
            const matchesText = !searchedText || rowText.includes(searchedText);
            const matchesLocation = !activeLocations.length || activeLocations.some(value => country.includes(value) || region.includes(value));
            row.style.display = matchesText && matchesLocation ? '' : 'none';
        });
    }

    function runCardSearch() {
        if (!cardsParent || !searchInput) return;

        search(cardsParent, {
            title: 'title',
            searchedText: searchInput.value,
            filteredTags: filterCheckboxes.filter(cb => cb.checked).map(cb => cb.value)
        });
    }

    if (searchInput && (cardsParent || directoryRows)) {
        searchInput.addEventListener('input', () => {
            if (directoryRows) runLocationSearch();
            if (cardsParent) runCardSearch();
        });

        filterCheckboxes.forEach(cb => cb.addEventListener('change', () => {
            if (directoryRows) runLocationSearch();
            if (cardsParent) runCardSearch();
        }));

        if (directoryRows) runLocationSearch();
        if (cardsParent) runCardSearch();
    }
});


/**
 * Filters direct children of parentEl based on title and tags.
 * @param {Element} parentEl - The parent element containing items to filter.
 * @param {Object} options - { title: string, searchedText: string, tags: string[] }
 */
function search(parentEl, { title, searchedText="", filteredTags=[] }) {
    // Only direct children
    Array.from(parentEl.children).forEach(child => {
        const matchesTitle = child.querySelector(`.${title}`).textContent.toLowerCase().includes(searchedText.toLowerCase().trim());;
        let matchesTags = true;

        // Tag filter
        const tagList = Array.from(child.querySelector(".tags").children).flatMap(tag => [...tag.classList]).filter(cls => cls !== "tag");
        for(let i = 0, l = filteredTags.length; i < l; i++) {
            if(!tagList.includes(filteredTags[i])){
                matchesTags = false;
                break;
            }
        }

      if (matchesTitle && matchesTags) {
            child.style.display = "block";
            child.classList.remove("fade-out");
            child.classList.add("fade-in");
        } else {
            child.classList.remove("fade-in");
            child.classList.add("fade-out");

            child.addEventListener("animationend", () => {
                if (child.classList.contains("fade-out")) child.style.display = "none";
                child.removeEventListener("animationend", onAnimationEnd);
            });        
        }
    });
}
