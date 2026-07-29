(() => {
  function makeClickable(element, destination, label) {
    if (!element || !destination) return;
    element.dataset.go = destination;
    element.setAttribute('role', 'link');
    element.setAttribute('tabindex', '0');
    if (label) element.setAttribute('aria-label', label);
    element.classList.add('clickable-lesson');
  }

  function simplifyOverview() {
    document.querySelectorAll('.path-card').forEach(card => {
      card.classList.remove('featured-path', 'restricted-path', 'compact-path');
      card.querySelector('.path-label')?.remove();

      const count = card.querySelector('.path-meta span');
      if (count) {
        const number = Number.parseInt(count.textContent, 10);
        count.textContent = `${number} ${number === 1 ? 'Lesson' : 'Lessons'}`;
      }

      const button = card.querySelector('button[data-go]');
      if (!button) return;

      let destination = button.dataset.go;
      const title = card.querySelector('h2')?.textContent?.trim() || 'lesson area';

      if (destination === 'path/start-here') {
        destination = 'lesson/first-time-m365-sign-in';
        button.dataset.go = destination;
      }

      button.textContent = 'Open';
      button.setAttribute('aria-label', `Open ${title}`);
      makeClickable(card, destination, `Open ${title}`);
    });
  }

  function simplifyLessonGroup() {
    const hero = document.querySelector('.path-hero');
    if (!hero) return;

    const eyebrow = hero.querySelector('.eyebrow');
    if (eyebrow) eyebrow.textContent = 'Lessons';
    hero.querySelector('.path-label')?.remove();

    const summary = hero.querySelector('.path-summary span');
    if (summary) {
      const number = Number.parseInt(summary.textContent, 10);
      summary.textContent = `${number} ${number === 1 ? 'Lesson' : 'Lessons'}`;
    }

    document.querySelectorAll('.lesson-row').forEach(row => {
      const button = row.querySelector('button[data-go]');
      if (!button) return;

      const title = row.querySelector('h2')?.textContent?.trim() || 'lesson';
      const destination = button.dataset.go;
      button.textContent = 'Open Lesson';
      button.setAttribute('aria-label', `Open Lesson: ${title}`);
      makeClickable(row, destination, `Open Lesson: ${title}`);
    });
  }

  function simplifySingleLessonNavigation() {
    if (!location.hash.includes('lesson/first-time-m365-sign-in')) return;

    const crumbs = document.querySelector('.crumbs');
    if (crumbs) {
      const links = crumbs.querySelectorAll('a');
      if (links.length > 1) {
        const groupLink = links[1];
        const separator = groupLink.nextElementSibling;
        groupLink.remove();
        if (separator?.getAttribute('aria-hidden') === 'true') separator.remove();
      }
    }

    const backButton = document.querySelector('.lesson-actions [data-go^="path/"]');
    if (backButton) {
      backButton.dataset.go = '';
      backButton.textContent = 'Back to Learn';
    }
  }

  function simplifyLanguage() {
    document.querySelectorAll('.section-heading h2').forEach(heading => {
      if (/training path/i.test(heading.textContent)) heading.textContent = 'Choose the Lessons you need.';
    });

    document.querySelectorAll('.section-heading p').forEach(paragraph => {
      if (/Open the topic that matches/i.test(paragraph.textContent)) {
        paragraph.textContent = 'Open the Lesson area that matches what you are trying to do.';
      }
    });
  }

  function apply() {
    simplifyOverview();
    simplifyLessonGroup();
    simplifySingleLessonNavigation();
    simplifyLanguage();
  }

  document.addEventListener('keydown', event => {
    const clickable = event.target.closest('.clickable-lesson[data-go]');
    if (!clickable || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    clickable.click();
  });

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => setTimeout(apply, 0));
  apply();
})();