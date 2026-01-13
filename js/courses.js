import { escapeHTML } from './utils.js';

export function isValidCourse(course) {
  return course && course.title && course.description && course.image && course.url;
}

export function createCourseCard(course) {
  const article = document.createElement("article");
  article.className = `course-card ${course.highlight ? "highlight" : ""}`;

  article.innerHTML = `
    <div class="course-image">
      <img src="${course.image}" alt="${escapeHTML(course.title)}">
      ${renderBadge(course)}
    </div>
    <div class="course-content">
      <h3>${escapeHTML(course.title)}</h3>
      <p>${escapeHTML(course.description)}</p>
      <div class="course-footer">
        <span class="level">${escapeHTML(course.level || "")} - ${course.price}€</span>
        <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="btn">
          Ver curso
        </a>
      </div>
    </div>
  `;
  return article;
}

export function renderBadge(course) {
  if (!course.badge) return "";
  return `<span class="badge ${course.badgeColor || ""}">${escapeHTML(course.badge)}</span>`;
}

export function renderCourses(container, courses) {
  container.innerHTML = "";
  if (!courses.length) return container.innerHTML = "<p>No hay cursos disponibles.</p>";

  const fragment = document.createDocumentFragment();
  courses.forEach((course, index) => {
    if (!isValidCourse(course)) return;
    const card = createCourseCard(course);
    card.style.transitionDelay = `${index * 0.1}s`;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(card);

    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}
