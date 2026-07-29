(() => {
  const params = new URLSearchParams(window.location.search);
  const route = params.get('route');
  if (!route) return;

  const clean = route.replace(/^#/, '').replace(/^\/+/, '');
  if (!/^(path|lesson)\/[A-Za-z0-9_-]+$/.test(clean)) return;

  const cleanUrl = `${window.location.pathname}#${clean}`;
  window.history.replaceState(null, '', cleanUrl);
})();