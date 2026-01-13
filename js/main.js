import { renderCourses } from './courses.js';
import { setupFilters } from './filters.js';

const CONFIG = { COURSES_URL: "courses.json", CONTAINER_ID: "courses" };
let allCourses = [];

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById(CONFIG.CONTAINER_ID);
  try {
    allCourses = await fetch(CONFIG.COURSES_URL).then(res => res.json());
    renderCourses(container, allCourses);
    setupFilters(allCourses, container);

    // Listener para actualizar cursos filtrados
    container.addEventListener('updateCourses', e => renderCourses(container, e.detail));
  } catch (err) {
    container.innerHTML = "<p style='color:#b91c1c'>Error cargando cursos.</p>";
    console.error(err);
  }
});
