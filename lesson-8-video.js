(() => {
  const lessonId = new URLSearchParams(window.location.search).get('lesson');
  if (lessonId !== 'voice-profile-and-transcript') return;

  function installVideo() {
    const lessonPage = document.querySelector('.simple-lesson-page');
    if (!lessonPage) return false;

    const meta = lessonPage.querySelector('.simple-lesson-header .simple-meta');
    if (meta) {
      const status = Array.from(meta.querySelectorAll('span')).find(span => /video/i.test(span.textContent));
      if (status) status.textContent = 'Video available';
    }

    const section = Array.from(lessonPage.querySelectorAll('.simple-block')).find(block => {
      const heading = block.querySelector('h2');
      return heading && heading.textContent.trim() === 'Let Teams Remember Who Said What';
    });
    if (!section) return false;

    const placeholder = section.querySelector('.simple-placeholder');
    if (!placeholder) return true;

    const video = document.createElement('video');
    video.className = 'simple-video';
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    video.setAttribute('aria-label', 'Let Teams Remember Who Said What training video');

    const source = document.createElement('source');
    source.src = 'assets/videos/Let_Teams_Remember_Who_Said_What_Under25MB.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    video.appendChild(document.createTextNode('Your browser cannot play this video.'));

    placeholder.replaceWith(video);
    video.load();
    return true;
  }

  if (installVideo()) return;

  const observer = new MutationObserver(() => {
    if (installVideo()) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 10000);
})();