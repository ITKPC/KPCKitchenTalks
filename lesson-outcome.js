(() => {
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function enhanceOutcome() {
    const lessonId = location.hash.match(/^#lesson\/(.+)$/)?.[1];
    if (!lessonId) return;

    const lesson = window.KPCLearning?.lessons?.find(item => item.id === lessonId);
    const panel = document.querySelector(".lesson-block.understand");
    if (!lesson || !panel || panel.dataset.outcomeEnhanced === lessonId) return;

    panel.dataset.outcomeEnhanced = lessonId;
    panel.innerHTML = `
      <div class="outcome-mark" aria-hidden="true">✓</div>
      <div class="outcome-copy">
        <p class="block-label">After this lesson</p>
        <h2>${escapeHtml(lesson.outcome)}</h2>
        <p>${escapeHtml(lesson.whyItMatters)}</p>
      </div>`;
  }

  const observer = new MutationObserver(enhanceOutcome);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(enhanceOutcome, 0));
  enhanceOutcome();
})();