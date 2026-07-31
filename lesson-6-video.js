(() => {
  const lessonId = new URLSearchParams(location.search).get('lesson');
  if (lessonId !== 'how-to-ask-copilot') return;

  const meta = document.querySelector('.simple-lesson-header .simple-meta');
  if (meta) {
    const videoStatus = [...meta.querySelectorAll('span')].find(item => /video/i.test(item.textContent));
    if (videoStatus) videoStatus.textContent = 'Video available';
  }

  const blocks = [...document.querySelectorAll('.simple-block')];
  const videoBlock = blocks.find(block => block.querySelector('h2')?.textContent.trim() === 'How to Ask Copilot for Help');
  if (!videoBlock) return;

  const placeholder = videoBlock.querySelector('.simple-placeholder');
  if (!placeholder) return;

  const video = document.createElement('video');
  video.className = 'simple-video';
  video.controls = true;
  video.preload = 'metadata';
  video.playsInline = true;
  video.setAttribute('aria-label', 'How to Ask Copilot for Help training video');

  const source = document.createElement('source');
  source.src = 'assets/videos/How_to_Ask_Copilot_for_Help_Under25MB%20%281%29.mp4';
  source.type = 'video/mp4';
  video.appendChild(source);
  video.appendChild(document.createTextNode('Your browser cannot play this video.'));

  placeholder.replaceWith(video);
  video.load();
})();