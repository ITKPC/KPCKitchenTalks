(() => {
  function simplifyOverview() {
    document.querySelectorAll('.path-card').forEach(card => {
      card.classList.remove('featured-path', 'restricted-path', 'compact-path');
      card.querySelector('.path-label')?.remove();

      const count = card.querySelector('.path-meta span');
      if (count) {
        const number = Number.parseInt(count.textContent, 10);
        count.textContent = `${number} ${number === 1 ? 'lesson' : 'lessons'}`;
      }

      const button = card.querySelector('[data-go]');
      if (button) {
        button.textContent = 'Open';
        if (button.dataset.go === 'path/start-here') {
          button.dataset.go = 'lesson/first-time-m365-sign-in';
          button.setAttribute('aria-label', 'Open Signing into Microsoft 365 for the first time');
        }
      }
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
      summary.textContent = `${number} ${number === 1 ? 'lesson' : 'lessons'}`;
    }

    document.querySelectorAll('.lesson-row [data-go]').forEach(button => {
      button.textContent = 'Open lesson';
      const title = button.closest('.lesson-row')?.querySelector('h2')?.textContent?.trim();
      if (title) button.setAttribute('aria-label', `Open lesson: ${title}`);
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
      if (/training path/i.test(heading.textContent)) heading.textContent = 'Choose the lessons you need.';
    });

    document.querySelectorAll('.section-heading p').forEach(paragraph => {
      if (/Open the topic that matches/i.test(paragraph.textContent)) {
        paragraph.textContent = 'Open the lesson area that matches what you are trying to do.';
      }
    });
  }

  function apply() {
    simplifyOverview();
    simplifyLessonGroup();
    simplifySingleLessonNavigation();
    simplifyLanguage();
  }

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', () => setTimeout(apply, 0));
  apply();
})();