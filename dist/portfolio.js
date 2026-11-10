const filters = document.querySelector('.filters');
const buttons = [...filters.querySelectorAll('button')];
const projects = [...document.querySelectorAll('[data-category]')];
const results = document.querySelector('#resultados');

filters.hidden = false;
filters.addEventListener('click', (event) => {
  const selected = event.target.closest('[data-filter]');
  if (!selected) return;

  const category = selected.dataset.filter;
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button === selected));
  }

  for (const project of projects) {
    project.hidden = category !== 'all' && project.dataset.category !== category;
  }

  const count = projects.filter((project) => !project.hidden).length;
  results.textContent = count === 1 ? '1 projeto exibido.' : count + ' projetos exibidos.';
});