(() => {
  if (!document.querySelector("#lessonBackStyles")) {
    const style = document.createElement("style");
    style.id = "lessonBackStyles";
    style.textContent = `
      .lesson-actions.lesson-back-row{display:flex;justify-content:flex-start;margin-top:1rem;padding:0;background:transparent;border:0}
      .lesson-actions.lesson-back-row .lesson-back-button{width:auto!important;min-height:auto;padding:.7rem .9rem;border:0;background:transparent;color:var(--navy);font-size:1rem;font-weight:850;box-shadow:none}
      .lesson-actions.lesson-back-row .lesson-back-button:hover,.lesson-actions.lesson-back-row .lesson-back-button:focus-visible{background:#edf4fb;border-radius:10px}
      @media(max-width:620px){.lesson-actions.lesson-back-row .lesson-back-button{width:auto!important;text-align:left}}
    `;
    document.head.appendChild(style);
  }

  function tidyLesson() {
    document.querySelectorAll(".lesson-block.practise").forEach(panel => {
      if (panel.dataset.smallTaskRemoved === "true") return;
      const headings = [...panel.querySelectorAll("h3")];
      const heading = headings.find(item => item.textContent.trim() === "Try one small task");
      if (!heading) return;
      const next = heading.nextElementSibling;
      heading.remove();
      if (next && next.tagName === "P") next.remove();
      panel.dataset.smallTaskRemoved = "true";
    });

    document.querySelectorAll(".lesson-actions").forEach(actions => {
      actions.classList.add("lesson-back-row");
      const backButton = actions.querySelector("[data-go^='path/']");
      if (backButton) {
        backButton.textContent = "← Back to lessons";
        backButton.classList.add("lesson-back-button");
      }
    });
  }

  const observer = new MutationObserver(tidyLesson);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(tidyLesson, 0));
  tidyLesson();
})();