(() => {
  function enhanceLesson() {
    const page = document.querySelector(".lesson-page");
    if (!page || page.dataset.layoutEnhanced === "true") return;

    page.dataset.layoutEnhanced = "true";
    page.classList.add("lesson-refined");

    const sources = page.querySelector(".two-source-grid");
    const help = page.querySelector(".help-block");

    if (sources) {
      const kpc = sources.querySelector(".kpc-source");
      const microsoft = sources.querySelector(".microsoft-source");
      if (kpc && sources.firstElementChild !== kpc) sources.prepend(kpc);

      if (microsoft) {
        microsoft.classList.add("optional-source");
        const original = microsoft.innerHTML;
        microsoft.innerHTML = `
          <details>
            <summary>Optional: official Microsoft help</summary>
            <div class="optional-source-body">${original}</div>
          </details>`;
      }
    }

    if (help) {
      help.classList.add("help-collapsed");
      const original = help.innerHTML;
      help.innerHTML = `
        <details>
          <summary>Having trouble? Open help options</summary>
          <div class="help-inner">${original}</div>
        </details>`;
    }
  }

  const observer = new MutationObserver(enhanceLesson);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(enhanceLesson, 0));
  enhanceLesson();
})();