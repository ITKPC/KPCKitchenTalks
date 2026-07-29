(() => {
  const lessonId = new URLSearchParams(location.search).get('lesson');
  if (lessonId !== 'teams-working-together') return;

  const meta = document.querySelector('.simple-lesson-header .simple-meta');
  if (meta) {
    const videoStatus = [...meta.querySelectorAll('span')].find(item => /video/i.test(item.textContent));
    if (videoStatus) videoStatus.textContent = 'Video available';
  }

  const blocks = [...document.querySelectorAll('.simple-block')];
  const videoBlock = blocks.find(block => block.querySelector('h2')?.textContent.trim() === 'Working together in Microsoft Teams');
  if (!videoBlock) return;

  const placeholder = videoBlock.querySelector('.simple-placeholder');
  if (!placeholder) return;

  const video = document.createElement('video');
  video.className = 'simple-video';
  video.controls = true;
  video.preload = 'metadata';
  video.playsInline = true;
  video.setAttribute('aria-label', 'Teams: Working Together training video');
  video.innerHTML = '<source src="assets/videos/teams-working-together-web.mp4" type="video/mp4">Your browser cannot play this video.';
  placeholder.replaceWith(video);
})();