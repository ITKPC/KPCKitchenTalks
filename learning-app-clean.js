(() => {
  const app = document.querySelector('#learningApp');
  const data = window.KPCLearning;
  if (!app) return;
  if (!data || !Array.isArray(data.learningPaths) || !Array.isArray(data.lessons)) {
    app.innerHTML = '<section class="section white learn-error"><h1>Learn is temporarily unavailable.</h1><p>Please refresh the page.</p></section>';
    return;
  }

  const { learningPaths, lessons, helpContact } = data;
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const pathById = id => learningPaths.find(path => path.id === id);
  const lessonById = id => lessons.find(lesson => lesson.id === id);
  const pathLessons = path => path.lessons.map(lessonById).filter(Boolean);
  const lessonCount = count => `${count} ${count === 1 ? 'Lesson' : 'Lessons'}`;

  function isLessonBuilt(lesson) {
    if (!lesson) return false;
    if (lesson.builtOut === true) return true;
    const hasWrittenContent = Array.isArray(lesson.steps) && lesson.steps.length >= 3;
    const hasCheck = Array.isArray(lesson.knowledgeCheck) && lesson.knowledgeCheck.length >= 1;
    return hasWrittenContent && hasCheck;
  }

  function statusClass(built) {
    return built ? 'lesson-status-built' : 'lesson-status-incomplete';
  }

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (parts[0] === 'path' && parts[1]) return { view: 'path', id: parts[1] };
    if (parts[0] === 'lesson' && parts[1]) return { view: 'lesson', id: parts[1] };
    return { view: 'overview' };
  }

  function navigate(destination) {
    const nextHash = destination ? `#${destination}` : '#';
    if (location.hash === nextHash) render();
    else location.hash = nextHash;
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function mascotImage(path, className = '') {
    return `<img class="${className}" src="${escapeText(path.mascot)}" alt="${escapeText(path.mascotAlt)}" loading="lazy" onerror="this.hidden=true">`;
  }

  function statusPills(items = []) {
    return `<div class="status-list">${items.map(item => `<span>${escapeText(item)}</span>`).join('')}</div>`;
  }

  function cardDestination(path) {
    return path.lessons.length === 1 ? `lesson/${path.lessons[0]}` : `path/${path.id}`;
  }

  function pathCard(path) {
    const destination = cardDestination(path);
    const items = pathLessons(path);
    const complete = items.length > 0 && items.every(isLessonBuilt);
    const action = path.lessons.length === 1 ? 'Start this Lesson' : 'Explore Lessons';
    return `<article class="path-card" data-go="${destination}" role="link" tabindex="0" aria-label="${escapeText(action)}: ${escapeText(path.title)}">
      <div class="path-visual">${mascotImage(path)}</div>
      <div class="path-card-body">
        <h2>${escapeText(path.title)}</h2>
        <p>${escapeText(path.description)}</p>
        <div class="path-meta"><span>${lessonCount(path.lessons.length)}</span></div>
        <button class="button ${statusClass(complete)}" data-go="${destination}" title="${complete ? 'Lessons built' : 'Lessons still being developed'}">${action}</button>
      </div>
    </article>`;
  }

  function renderOverview() {
    const volunteerPaths = learningPaths.filter(path => !path.restricted);
    app.innerHTML = `
      <section class="learning-hero">
        <div class="learn-welcome-copy">
          <p class="eyebrow">KPC Microsoft 365 Learning</p>
          <h1>Learn the few things you need for your KPC role.</h1>
          <p>Start with your first sign-in, then explore Outlook, Teams, shared information, everyday apps and account safety. What you can see inside Microsoft 365 will reflect the board, committee or project work assigned to you.</p>
        </div>
      </section>
      <section class="section white path-section">
        <div class="section-heading"><p class="eyebrow">The essentials</p><h2>Six ideas that make Microsoft 365 easier.</h2><p>Begin with the section that fits your role today. Return whenever your responsibilities change.</p></div>
        <div class="path-grid">${volunteerPaths.map(pathCard).join('')}</div>
      </section>
      <section class="section white unsure-section"><div><p class="eyebrow">Prefer to explore?</p><h2>Try a short KPC learning game.</h2><p>Use realistic situations to discover which area may be useful next.</p></div><a class="button dark" href="index.html#games">Open the games</a></section>`;
  }

  function breadcrumbs(items) {
    return `<nav class="crumbs" aria-label="Breadcrumb">${items.map((item, index) => index === items.length - 1 ? `<span aria-current="page">${escapeText(item.label)}</span>` : `<a href="${item.href}">${escapeText(item.label)}</a><span aria-hidden="true">›</span>`).join('')}</nav>`;
  }

  function lessonRow(path, lesson, index) {
    const destination = `lesson/${lesson.id}`;
    const built = isLessonBuilt(lesson);
    const action = built
      ? `<a class="button ${statusClass(true)}" href="#${destination}" aria-label="Open Lesson: ${escapeText(lesson.title)}">Open Lesson</a>`
      : `<span class="button ${statusClass(false)} lesson-unavailable" aria-disabled="true" title="Lesson still being developed">Coming Soon</span>`;
    return `<article class="lesson-row ${built ? 'lesson-row-built' : 'lesson-row-incomplete'}"${built ? ` data-go="${destination}" role="link" tabindex="0" aria-label="Open Lesson: ${escapeText(lesson.title)}"` : ''}>
      <div class="lesson-mascot">${mascotImage(path, 'lesson-mascot-image')}</div>
      <div class="lesson-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
      <div class="lesson-copy"><div class="lesson-title-line"><h2>${escapeText(lesson.title)}</h2></div><p>${escapeText(lesson.description)}</p>${statusPills(lesson.contentStatus)}<span class="estimated">About ${lesson.estimatedMinutes || 4} minutes</span></div>
      ${action}
    </article>`;
  }

  function renderPath(pathId) {
    const path = pathById(pathId);
    if (!path || path.restricted) return renderNotFound();
    const items = pathLessons(path);
    if (items.length === 1) return navigate(`lesson/${items[0].id}`);
    app.innerHTML = `${breadcrumbs([{ label: 'Learn', href: 'learn.html' }, { label: path.title }])}
      <section class="path-hero"><div><p class="eyebrow">Lessons</p><h1>${escapeText(path.title)}</h1><p>${escapeText(path.description)}</p><p class="outcome"><strong>${escapeText(path.outcome)}</strong></p>${path.memoryAid ? `<aside class="memory-aid"><strong>Less Computer, More Pickleball</strong><p>${escapeText(path.memoryAid)}</p></aside>` : ''}<div class="path-summary"><span>${lessonCount(items.length)}</span></div></div>${mascotImage(path, 'path-hero-mascot')}</section>
      <section class="section white"><div class="lesson-list">${items.map((lesson, index) => lessonRow(path, lesson, index)).join('')}</div></section>`;
  }

  function checkMarkup(question, index) {
    return `<fieldset class="check-question"><legend>${escapeText(question.q)}</legend>${question.a.map((answer, answerIndex) => `<label><input type="radio" name="q${index}" value="${answerIndex}"> <span>${escapeText(answer)}</span></label>`).join('')}</fieldset>`;
  }

  function renderLesson(lessonId) {
    const lesson = lessonById(lessonId);
    if (!lesson || !isLessonBuilt(lesson)) return renderNotFound();
    const path = pathById(lesson.pathId);
    if (!path) return renderNotFound();
    const singleLesson = path.lessons.length === 1;
    const crumbs = singleLesson ? [{ label: 'Learn', href: 'learn.html' }, { label: lesson.title }] : [{ label: 'Learn', href: 'learn.html' }, { label: path.title, href: `#path/${path.id}` }, { label: lesson.title }];
    const hasSteps = Array.isArray(lesson.steps) && lesson.steps.length;
    const hasCheck = Array.isArray(lesson.knowledgeCheck) && lesson.knowledgeCheck.length;

    app.innerHTML = `${breadcrumbs(crumbs)}<article class="lesson-page">
      <header class="lesson-header-with-mascot"><div class="lesson-header-copy"><p class="eyebrow">${escapeText(path.title)}</p><h1>${escapeText(lesson.title)}</h1><p>${escapeText(lesson.description)}</p><div class="lesson-meta"><span>About ${lesson.estimatedMinutes || 4} minutes</span><span>${escapeText(lesson.status || 'outline ready')}</span></div>${statusPills(lesson.contentStatus)}</div>${mascotImage(path, 'lesson-header-mascot')}</header>
      <section class="lesson-block understand"><p class="block-label">Understand</p><h2>What you will be able to do</h2><p class="outcome"><strong>${escapeText(lesson.outcome)}</strong></p><h3>Why this matters at KPC</h3><p>${escapeText(lesson.whyItMatters)}</p></section>
      <section class="two-source-grid"><div class="lesson-block microsoft-source"><p class="block-label">Microsoft explains the tool</p>${lesson.microsoftVideo ? `<h2>${escapeText(lesson.microsoftVideo.title)}</h2><p>${escapeText(lesson.microsoftVideo.duration)} · ${escapeText(lesson.microsoftVideo.publisher)}</p><a class="button dark" href="${lesson.microsoftVideo.url}" target="_blank" rel="noopener noreferrer">Open Microsoft lesson</a>` : '<h2>Content can be added here</h2><p>Add the most relevant official Microsoft video or written support when it is selected.</p>'}</div><div class="lesson-block kpc-source"><p class="block-label">See how KPC uses it</p><h2>${lesson.kpcVideo?.url ? 'KPC demonstration' : 'KPC demonstration coming soon'}</h2><p>${lesson.kpcVideo?.url ? 'Watch the task in the KPC environment.' : 'Add a short KPC screen recording, screenshots or written example when ready.'}</p></div></section>
      <section class="lesson-block practise"><p class="block-label">Practise</p><h2>Follow the written steps</h2>${hasSteps ? `<ol class="steps">${lesson.steps.map(step => `<li>${escapeText(step)}</li>`).join('')}</ol>` : '<div class="intentional-placeholder"><strong>This lesson is ready for content.</strong><p>Add written steps, screenshots or a practice activity here as the training is developed.</p></div>'}<h3>Try one small task</h3><p>${lesson.practiceTask ? escapeText(lesson.practiceTask) : 'Add a short practice task when this lesson is developed.'}</p></section>
      <section class="lesson-block check"><p class="block-label">Check</p><h2>Check your understanding</h2>${hasCheck ? `<div class="inline-check" data-check-lesson="${lesson.id}">${lesson.knowledgeCheck.map(checkMarkup).join('')}<button class="button dark" data-check-answers>Check my choices</button><div class="check-result" aria-live="polite"></div></div>` : '<p>Add one to three practical questions or a realistic KPC scenario here.</p>'}</section>
      <section class="lesson-block help-block"><h2>What to do if it does not work</h2><ul>${(lesson.troubleshooting || [helpContact.instructions]).map(item => `<li>${escapeText(item)}</li>`).join('')}</ul><p><strong>${escapeText(helpContact.label)}:</strong> ${escapeText(helpContact.instructions)}</p></section>
      <footer class="lesson-actions"><button class="button outline" data-go="${singleLesson ? '' : `path/${path.id}`}">${singleLesson ? 'Back to Learn' : `Back to ${escapeText(path.title)}`}</button></footer>
    </article>`;
  }

  function renderNotFound() {
    app.innerHTML = '<section class="section white"><h1>This lesson is not available yet.</h1><p>Return to the lesson list and choose a green lesson.</p><button class="button dark" data-go="">Back to Learn</button></section>';
  }

  function render() {
    const current = route();
    if (current.view === 'path') renderPath(current.id);
    else if (current.view === 'lesson') renderLesson(current.id);
    else renderOverview();
    app.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent('kpc:learn-rendered', { detail: current }));
  }

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#lesson/"]');
    if (anchor) return;

    const go = event.target.closest('[data-go]');
    if (go) {
      event.preventDefault();
      navigate(go.dataset.go || '');
      return;
    }
    if (event.target.closest('[data-check-answers]')) {
      const wrapper = event.target.closest('[data-check-lesson]');
      const lesson = lessonById(wrapper.dataset.checkLesson);
      let correct = 0;
      lesson.knowledgeCheck.forEach((question, index) => {
        const selected = wrapper.querySelector(`input[name=q${index}]:checked`);
        if (selected && Number(selected.value) === question.correct) correct++;
      });
      wrapper.querySelector('.check-result').innerHTML = correct === lesson.knowledgeCheck.length ? '<strong>You found the right play.</strong><p>All choices match the KPC approach.</p>' : `<strong>That one can be confusing.</strong><p>${correct} of ${lesson.knowledgeCheck.length} choices match. Take another look at the KPC example above.</p>`;
    }
  });

  document.addEventListener('keydown', event => {
    const card = event.target.closest('[role=link][data-go]');
    if (!card || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    navigate(card.dataset.go || '');
  });

  window.addEventListener('hashchange', render);
  window.addEventListener('popstate', render);
  render();
})();