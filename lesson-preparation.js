(() => {
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function enhancePreparation() {
    const lessonId = location.hash.match(/^#lesson\/(.+)$/)?.[1];
    if (!lessonId) return;

    const lesson = window.KPCLearning?.lessons?.find(item => item.id === lessonId);
    const practice = document.querySelector(".lesson-block.practise");
    if (!lesson || !practice || !Array.isArray(lesson.beforeYouStart) || !lesson.beforeYouStart.length) return;
    if (practice.dataset.preparationEnhanced === lessonId) return;

    practice.dataset.preparationEnhanced = lessonId;
    const heading = practice.querySelector("h2");
    if (!heading) return;

    const preparation = document.createElement("section");
    preparation.className = "before-you-start";
    preparation.innerHTML = `
      <div class="preparation-heading">
        <span class="preparation-icon" aria-hidden="true">✓</span>
        <div><p class="block-label">Before you begin</p><h3>Have these ready</h3></div>
      </div>
      <ul>${lesson.beforeYouStart.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      ${lesson.authenticatorWarning ? `<aside class="authenticator-warning"><strong>Choose the correct app:</strong> ${escapeHtml(lesson.authenticatorWarning)}</aside>` : ""}`;

    heading.insertAdjacentElement("afterend", preparation);
  }

  const observer = new MutationObserver(enhancePreparation);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(enhancePreparation, 0));
  enhancePreparation();
})();