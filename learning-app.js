(() => {
  const app = document.querySelector("#learningApp");
  const data = window.KPCLearning;

  if (!app) return;
  if (!data || !Array.isArray(data.learningPaths) || !Array.isArray(data.lessons)) {
    app.innerHTML = `<section class="section white learn-error"><h1>Learn is temporarily unavailable.</h1><p>The training topics could not be loaded. Please refresh the page.</p></section>`;
    return;
  }

  const { learningPaths, lessons, helpContact } = data;
  const progressKey = "kpcLearningProgress";

  function readProgress() {
    try { return JSON.parse(localStorage.getItem(progressKey) || "{}") || {}; }
    catch { return {}; }
  }

  function saveProgress(value) {
    try { localStorage.setItem(progressKey, JSON.stringify(value)); }
    catch {}
  }

  function escapeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function pathById(id) { return learningPaths.find(path => path.id === id); }
  function lessonById(id) { return lessons.find(lesson => lesson.id === id); }
  function pathLessons(path) { return path.lessons.map(lessonById).filter(Boolean); }
  function mascotSrc(path) { return path.mascot; }

  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "path" && parts[1]) return { view: "path", pathId: parts[1] };
    if (parts[0] === "lesson" && parts[1]) return { view: "lesson", lessonId: parts[1] };
    return { view: "overview" };
  }

  function navigate(destination) {
    history.pushState(null, "", destination ? `#${destination}` : "#");
    render();
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function progressFor(path) {
    const progress = readProgress();
    const completed = path.lessons.filter(id => progress[id]?.completed).length;
    return { completed, total: path.lessons.length, percent: path.lessons.length ? Math.round(completed / path.lessons.length * 100) : 0 };
  }

  function statusPills(items = []) {
    return `<div class="status-list">${items.map(item => `<span>${escapeText(item)}</span>`).join("")}</div>`;
  }

  function mascotImage(path, className = "") {
    return `<img class="${className}" src="${escapeText(mascotSrc(path))}" alt="${escapeText(path.mascotAlt)}" loading="lazy" onerror="this.hidden=true">`;
  }

  function pathCard(path, compact = false) {
    const progress = progressFor(path);
    const action = progress.completed ? "Continue this path" : path.featured ? "Start this path" : "Explore lessons";
    return `<article class="path-card ${path.featured ? "featured-path" : ""} ${path.restricted ? "restricted-path" : ""} ${compact ? "compact-path" : ""}">
      <div class="path-visual">${mascotImage(path)}</div>
      <div class="path-card-body">
        ${path.label ? `<p class="path-label">${escapeText(path.label)}</p>` : ""}
        <h2>${escapeText(path.title)}</h2>
        <p>${escapeText(path.description)}</p>
        <p class="outcome"><strong>Outcome:</strong> ${escapeText(path.outcome)}</p>
        <div class="path-meta"><span>${path.lessons.length} topics</span><span>${progress.completed} completed</span></div>
        <div class="path-progress" aria-label="${progress.percent}% complete"><span style="width:${progress.percent}%"></span></div>
        <button class="button dark" data-go="path/${path.id}">${action}</button>
      </div>
    </article>`;
  }

  function renderOverview() {
    const volunteerPaths = learningPaths.filter(path => !path.restricted);
    const adminPath = learningPaths.find(path => path.restricted);

    app.innerHTML = `
      <section class="learning-hero">
        <p class="eyebrow">Learn</p>
        <h1>What do you need help with?</h1>
        <p>Choose the area that matches what you are trying to do. You do not need to learn everything at once.</p>
        <div class="need-chips" aria-label="Common tasks">
          <button data-go="path/committee-work">Where are the minutes?</button>
          <button data-go="lesson/join-teams-meeting">How do I join the meeting?</button>
          <button data-go="lesson/send-a-link">How do I send this to my committee?</button>
          <button data-go="path/files-what-goes-where">Where should this file go?</button>
          <button data-go="lesson/shared-mailboxes">Which email address should I use?</button>
          <button data-go="lesson/unexpected-sign-in">Why am I being asked to approve a sign-in?</button>
        </div>
      </section>
      <section class="section white path-section">
        <div class="section-heading"><p class="eyebrow">Start anywhere</p><h2>Choose a practical training path.</h2><p>Every path is already built. Open a topic and add content as it becomes ready.</p></div>
        <div class="path-grid">${volunteerPaths.map(path => pathCard(path)).join("")}</div>
      </section>
      ${adminPath ? `<section class="section admin-section"><div class="section-heading"><p class="eyebrow">Restricted training</p><h2>KPC Administration</h2><p>For people specifically authorized to manage KPC Microsoft 365 accounts and access.</p></div>${pathCard(adminPath, true)}</section>` : ""}
      <section class="section white unsure-section"><div><p class="eyebrow">Not sure where to begin?</p><h2>Try the Getting Started game.</h2><p>We will suggest the most useful training path.</p></div><a class="button dark" href="index.html#games">Open the Getting Started game</a></section>`;
  }

  function breadcrumbs(items) {
    return `<nav class="crumbs" aria-label="Breadcrumb">${items.map((item, index) => index === items.length - 1
      ? `<span aria-current="page">${escapeText(item.label)}</span>`
      : `<a href="${item.href}">${escapeText(item.label)}</a><span aria-hidden="true">›</span>`).join("")}</nav>`;
  }

  function lessonRow(path, lesson, index) {
    const completed = Boolean(readProgress()[lesson.id]?.completed);
    return `<article class="lesson-row">
      <div class="lesson-mascot">${mascotImage(path, "lesson-mascot-image")}</div>
      <div class="lesson-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
      <div class="lesson-copy">
        <div class="lesson-title-line"><h2>${escapeText(lesson.title)}</h2>${completed ? `<span class="complete-badge">Completed</span>` : ""}</div>
        <p>${escapeText(lesson.description)}</p>
        ${statusPills(lesson.contentStatus)}
        <span class="estimated">About ${lesson.estimatedMinutes || 4} minutes</span>
      </div>
      <button class="button outline" data-go="lesson/${lesson.id}" aria-label="Open topic: ${escapeText(lesson.title)}">${completed ? "Review topic" : "Open topic"}</button>
    </article>`;
  }

  function renderPath(pathId) {
    const path = pathById(pathId);
    if (!path) return renderNotFound();
    const topics = pathLessons(path);
    const progress = progressFor(path);

    app.innerHTML = `${breadcrumbs([{ label: "Learn", href: "learn.html" }, { label: path.title }])}
      <section class="path-hero ${path.restricted ? "restricted-path" : ""}">
        <div>
          <p class="eyebrow">Training path</p>
          ${path.label ? `<p class="path-label">${escapeText(path.label)}</p>` : ""}
          <h1>${escapeText(path.title)}</h1>
          <p>${escapeText(path.description)}</p>
          <p class="outcome"><strong>${escapeText(path.outcome)}</strong></p>
          ${path.memoryAid ? `<aside class="memory-aid"><strong>Less Computer, More Pickleball</strong><p>${escapeText(path.memoryAid)}</p><p>Teams is where committees work together. Shared Teams files are stored in SharePoint behind the scenes.</p></aside>` : ""}
          <div class="path-summary"><span>${topics.length} topics</span><span>${progress.completed} completed</span></div>
        </div>
        ${mascotImage(path, "path-hero-mascot")}
      </section>
      <section class="section white"><div class="lesson-list">${topics.map((lesson, index) => lessonRow(path, lesson, index)).join("")}</div></section>`;
  }

  function checkMarkup(question, index) {
    return `<fieldset class="check-question"><legend>${escapeText(question.q)}</legend>${question.a.map((answer, answerIndex) => `<label><input type="radio" name="q${index}" value="${answerIndex}"> <span>${escapeText(answer)}</span></label>`).join("")}</fieldset>`;
  }

  function renderLesson(lessonId) {
    const lesson = lessonById(lessonId);
    if (!lesson) return renderNotFound();
    const path = pathById(lesson.pathId);
    const progress = readProgress();
    progress[lesson.id] = { ...(progress[lesson.id] || {}), viewed: true, lastVisited: new Date().toISOString() };
    saveProgress(progress);

    const hasSteps = Array.isArray(lesson.steps) && lesson.steps.length;
    const hasCheck = Array.isArray(lesson.knowledgeCheck) && lesson.knowledgeCheck.length;

    app.innerHTML = `${breadcrumbs([{ label: "Learn", href: "learn.html" }, { label: path.title, href: `#path/${path.id}` }, { label: lesson.title }])}
      <article class="lesson-page">
        <header class="lesson-header-with-mascot">
          <div class="lesson-header-copy">
            <p class="eyebrow">${escapeText(path.title)}</p>
            <h1>${escapeText(lesson.title)}</h1>
            <p>${escapeText(lesson.description)}</p>
            <div class="lesson-meta"><span>About ${lesson.estimatedMinutes || 4} minutes</span><span>${escapeText(lesson.status || "outline ready")}</span></div>
            ${statusPills(lesson.contentStatus)}
          </div>
          ${mascotImage(path, "lesson-header-mascot")}
        </header>

        <section class="lesson-block understand"><p class="block-label">Understand</p><h2>What you will be able to do</h2><p class="outcome"><strong>${escapeText(lesson.outcome)}</strong></p><h3>Why this matters at KPC</h3><p>${escapeText(lesson.whyItMatters)}</p></section>

        <section class="two-source-grid">
          <div class="lesson-block microsoft-source"><p class="block-label">Microsoft explains the tool</p>${lesson.microsoftVideo ? `<h2>${escapeText(lesson.microsoftVideo.title)}</h2><p>${escapeText(lesson.microsoftVideo.duration)} · ${escapeText(lesson.microsoftVideo.publisher)}</p><a class="button dark" href="${lesson.microsoftVideo.url}" target="_blank" rel="noopener noreferrer">Open Microsoft lesson</a>` : `<h2>Content can be added here</h2><p>Add the most relevant official Microsoft video or written support when it is selected.</p>`}</div>
          <div class="lesson-block kpc-source"><p class="block-label">See how KPC uses it</p><h2>${lesson.kpcVideo?.url ? "KPC demonstration" : "KPC demonstration coming soon"}</h2><p>${lesson.kpcVideo?.url ? "Watch the task in the KPC environment." : "Add a short KPC screen recording, screenshots or written example when ready."}</p></div>
        </section>

        <section class="lesson-block practise"><p class="block-label">Practise</p><h2>Follow the written steps</h2>${hasSteps ? `<ol class="steps">${lesson.steps.map(step => `<li>${escapeText(step)}</li>`).join("")}</ol>` : `<div class="intentional-placeholder"><strong>This topic is ready for content.</strong><p>Add written steps, screenshots or a practice activity here as the training is developed.</p></div>`}<h3>Try one small task</h3><p>${lesson.practiceTask ? escapeText(lesson.practiceTask) : "Add a short practice task when this topic is developed."}</p></section>

        <section class="lesson-block check"><p class="block-label">Check</p><h2>Check your understanding</h2>${hasCheck ? `<div class="inline-check" data-check-lesson="${lesson.id}">${lesson.knowledgeCheck.map((question, index) => checkMarkup(question, index)).join("")}<button class="button dark" data-check-answers>Check my choices</button><div class="check-result" aria-live="polite"></div></div>` : `<p>Add one to three practical questions or a realistic KPC scenario here.</p>`}</section>

        <section class="lesson-block help-block"><h2>What to do if it does not work</h2><ul>${(lesson.troubleshooting || [helpContact.instructions]).map(item => `<li>${escapeText(item)}</li>`).join("")}</ul><p><strong>${escapeText(helpContact.label)}:</strong> ${escapeText(helpContact.instructions)}</p></section>

        <footer class="lesson-actions"><button class="button dark" data-complete="${lesson.id}">${progress[lesson.id]?.completed ? "Mark as not complete" : "Mark topic complete"}</button>${lesson.relatedKitchenTalkId ? `<a class="button outline" href="index.html?talk=${lesson.relatedKitchenTalkId}#talks">Open related KitchenTalk</a>` : ""}<button class="button outline" data-go="path/${path.id}">Back to ${escapeText(path.title)}</button></footer>
      </article>`;
  }

  function renderNotFound() {
    app.innerHTML = `<section class="section white"><h1>That training topic was not found.</h1><p>Return to Learn and choose another topic.</p><button class="button dark" data-go="">Back to Learn</button></section>`;
  }

  function render() {
    try {
      const current = route();
      if (current.view === "path") renderPath(current.pathId);
      else if (current.view === "lesson") renderLesson(current.lessonId);
      else renderOverview();
      app.focus({ preventScroll: true });
    } catch (error) {
      console.error("KPC Learn rendering error", error);
      app.innerHTML = `<section class="section white learn-error"><h1>Learn could not finish loading.</h1><p>Please refresh the page. The training topics are still saved in the project.</p></section>`;
    }
  }

  document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]");
    if (go) {
      event.preventDefault();
      navigate(go.dataset.go || "");
      return;
    }

    const complete = event.target.closest("[data-complete]");
    if (complete) {
      const progress = readProgress();
      const id = complete.dataset.complete;
      progress[id] = { ...(progress[id] || {}), viewed: true, completed: !progress[id]?.completed, lastVisited: new Date().toISOString() };
      saveProgress(progress);
      render();
      return;
    }

    if (event.target.closest("[data-check-answers]")) {
      const wrapper = event.target.closest("[data-check-lesson]");
      const lesson = lessonById(wrapper.dataset.checkLesson);
      let correct = 0;
      lesson.knowledgeCheck.forEach((question, index) => {
        const selected = wrapper.querySelector(`input[name=q${index}]:checked`);
        if (selected && Number(selected.value) === question.correct) correct++;
      });
      wrapper.querySelector(".check-result").innerHTML = correct === lesson.knowledgeCheck.length
        ? `<strong>You found the right play.</strong><p>All choices match the KPC approach.</p>`
        : `<strong>That one can be confusing.</strong><p>${correct} of ${lesson.knowledgeCheck.length} choices match. Take another look at the KPC example above.</p>`;
    }
  });

  window.addEventListener("popstate", render);
  render();
})();