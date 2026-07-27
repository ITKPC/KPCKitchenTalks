(() => {
  function removeSmallTaskPrompt() {
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
  }

  const observer = new MutationObserver(removeSmallTaskPrompt);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(removeSmallTaskPrompt, 0));
  removeSmallTaskPrompt();
})();