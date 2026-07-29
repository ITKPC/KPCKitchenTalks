(() => {
  function setText(element, text) {
    if (element && element.textContent !== text) element.textContent = text;
  }

  function makeClickable(element, destination, label) {
    if (!element || !destination) return;
    element.dataset.go = destination;
    element.setAttribute('role', 'link');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-label', label);
    element.classList.add('clickable-lesson');
  }

  function apply() {
    document.querySelectorAll('.path-card').forEach(card => {
      card.classList.remove('featured-path', 'restricted-path', 'compact-path');
      card.querySelector('.path-label')?.remove();

      const count = card.querySelector('.path-meta span');
      if (count) {
        const number = Number.parseInt(count.textContent, 10);
        setText(count, `${number} ${number === 1 ? 'Lesson' : 'Lessons'}`);
      }

      const button = card.querySelector('button[data-go]');
      if (!button) return;

      let destination = button.dataset.go;
      const title = card.querySelector('h2')?.textContent?.trim() || 'lesson area';
      if (destination === 'path/start-here') destination = 'lesson/first-time-m365-sign-in';

      button.dataset.go = destination;
      setText(button, 'Open');
      button.setAttribute('aria-label', `Open ${title}`);
      makeClickable(card, destination, `Open ${title}`);
    });

    const hero = document.querySelector('.path-hero');
    if (hero) {
      setText(hero.querySelector('.eyebrow'), 'Lessons');
      hero.querySelector('.path-label')?.remove();
      const summary = hero.querySelector('.path-summary span');
      if (summary) {
        const number = Number.parseInt(summary.textContent, 10);
        setText(summary, `${number} ${number === 1 ? 'Lesson' : 'Lessons'}`);
      }
    }

    document.querySelectorAll('.lesson-row').forEach(row => {
      const button = row.querySelector('button[data-go]');
      if (!button) return;
      const title = row.querySelector('h2')?.textContent?.trim() || 'lesson';
      setText(button, 'Open Lesson');
      button.setAttribute('aria-label', `Open Lesson: ${title}`);
      makeClickable(row, button.dataset.go, `Open Lesson: ${title}`);
    });

    if (location.hash.includes('lesson/first-time-m365-sign-in')) {
      const crumbs = document.querySelector('.crumbs');
      const links = crumbs?.querySelectorAll('a');
      if (links && links.length > 1) {
        const groupLink = links[1];
        const separator = groupLink.nextElementSibling;
        groupLink.remove();
        if (separator?.getAttribute('aria-hidden') === 'true') separator.remove();
      }

      const backButton = document.querySelector('.lesson-actions [data-go^="path/"]');
      if (backButton) {
        backButton.dataset.go = '';
        setText(backButton, 'Back to Learn');
      }
    }

    document.querySelectorAll('.section-heading h2').forEach(heading => {
      if (/training path/i.test(heading.textContent)) setText(heading, 'Choose the Lessons you need.');
    });
  }

  document.addEventListener('click', event => {
    const nestedControl = event.target.closest('button, a, input, select, textarea');
    const card = event.target.closest('.clickable-lesson[data-go]');
    if (card && !nestedControl) {
      event.preventDefault();
      const button = card.querySelector('button[data-go]');
      button?.click();
      return;
    }
    queueMicrotask(apply);
  });

  document.addEventListener('keydown', event => {
    const card = event.target.closest('.clickable-lesson[data-go]');
    if (!card || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    card.querySelector('button[data-go]')?.click();
  });

  window.addEventListener('popstate', () => queueMicrotask(apply));
  window.addEventListener('hashchange', () => queueMicrotask(apply));
  apply();
})();