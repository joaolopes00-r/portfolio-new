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

for (const heading of document.querySelectorAll('#titulo, .section-head h2, .about h2')) {
  heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());

  const containers = [heading, ...heading.querySelectorAll('.name-accent')];
  for (const container of containers) {
    for (const node of [...container.childNodes]) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;

      const words = node.textContent.split(/(\s+)/).map((word) => {
        if (!word.trim()) return word;

        const group = document.createElement('span');
        group.className = 'motion-word';
        group.setAttribute('aria-hidden', 'true');
        for (const character of word) {
          const letter = document.createElement('span');
          letter.className = 'motion-letter';
          letter.dataset.letter = character;
          letter.textContent = character;
          group.append(letter);
        }
        return group;
      });
      node.replaceWith(...words);
    }
  }
}

const supportsScrollAnimation = CSS.supports('(animation-timeline: view()) and (animation-range: entry 0% entry 75%)');

if (!supportsScrollAnimation && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-entering', entry.isIntersecting && entry.intersectionRatio >= 0.12);
    }
  }, { threshold: 0.12 });

  for (const element of document.querySelectorAll('.section-head, .card, .stack-card, .about')) {
    observer.observe(element);
  }
}
