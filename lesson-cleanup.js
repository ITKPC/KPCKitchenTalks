(() => {
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