(() => {
  function routeUrl(destination) {
    const clean = String(destination || '').replace(/^#/, '');
    if (!clean) return 'learn.html';
    return `learn.html?route=${encodeURIComponent(clean)}#${clean}`;
  }

  function destinationFromElement(element) {
    if (!element) return '';
    if (element.dataset?.go !== undefined) return element.dataset.go || '';

    const href = element.getAttribute?.('href') || '';
    const match = href.match(/#(path|lesson)\/[^?#]+/);
    return match ? match[0].slice(1) : '';
  }

  function hardenLinks() {
    document.querySelectorAll('a[href^="#path/"], a[href^="#lesson/"], a[href*="learn.html#path/"], a[href*="learn.html#lesson/"]').forEach(link => {
      const destination = destinationFromElement(link);
      if (!destination) return;
      link.href = routeUrl(destination);
      link.dataset.learnRoute = destination;
    });

    document.querySelectorAll('[data-go]').forEach(control => {
      const destination = control.dataset.go || '';
      control.dataset.learnRoute = destination;
    });
  }

  document.addEventListener('kpc:learn-rendered', hardenLinks);
  window.addEventListener('load', hardenLinks);

  document.addEventListener('click', event => {
    const control = event.target.closest('[data-learn-route]');
    if (!control) return;

    const destination = control.dataset.learnRoute || '';
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = routeUrl(destination);
  }, true);

  hardenLinks();
})();