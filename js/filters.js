import { debounce } from './utils.js';

export function setupFilters(allCourses, container) {
  const searchInput = document.getElementById("search-input");
  const levelFilter = document.getElementById("level-filter");
  const priceFilter = document.getElementById("price-filter");

  let filteredCourses = [...allCourses];

  const applyFilters = () => {
    const term = searchInput.value.toLowerCase();
    const level = levelFilter.value;
    const price = priceFilter.value;

    filteredCourses = allCourses.filter(c => {
      const matchName = c.title.toLowerCase().includes(term);
      const matchLevel = level ? c.level === level : true;

      let matchPrice = true;
      if (price && c.price !== undefined) {
        const [min, max] = price.split("-").map(Number);
        matchPrice = c.price >= min && c.price <= max;
      }

      return matchName && matchLevel && matchPrice;
    });

    container.dispatchEvent(new CustomEvent('updateCourses', { detail: filteredCourses }));
  };

  searchInput.addEventListener("input", debounce(applyFilters, 200));
  levelFilter.addEventListener("change", applyFilters);
  priceFilter.addEventListener("change", applyFilters);
}
