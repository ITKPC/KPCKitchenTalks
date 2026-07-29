(() => {
  function applyDirectLinks() {
    document.querySelectorAll('.lesson-row-built').forEach(row => {
      const link = row.querySelector('a.lesson-status-built');
      if (!link) return;

      const hash = link.getAttribute('href') || '';
      const lessonHash = hash.includes('#lesson/') ? hash.slice(hash.indexOf('#lesson/')) : '';
      if (!lessonHash) return;

      link.href = `learn.html${lessonHash}`;
      link.dataset.directLessonLink = 'true';

      row.removeAttribute('data-go');
      row.removeAttribute('role');
      row.removeAttribute('tabindex');
      row.removeAttribute('aria-label');
    });
  }

  document.addEventListener('kpc:learn-rendered', applyDirectLinks);
  window.addEventListener('load', applyDirectLinks);

  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-direct-lesson-link="true"]');
    if (!link) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(link.href);
  }, true);

  applyDirectLinks();
})();