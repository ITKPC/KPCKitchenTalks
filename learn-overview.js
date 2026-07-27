(() => {
  function enhanceOverview() {
    const hero = document.querySelector(".learning-hero");
    const pathSection = document.querySelector(".path-section");
    if (!hero || !pathSection || hero.dataset.simplified === "true") return;

    hero.dataset.simplified = "true";
    hero.innerHTML = `
      <div class="learn-welcome-copy">
        <p class="eyebrow">KPC Microsoft 365 Learning</p>
        <h1>Learn the few things you need for your KPC role.</h1>
        <p>Start with your first sign-in, then explore Outlook, Teams, shared information, everyday apps and account safety. What you can see inside Microsoft 365 will reflect the board, committee or project work assigned to you.</p>
      </div>`;

    const heading = pathSection.querySelector(".section-heading");
    if (heading) {
      heading.innerHTML = `
        <p class="eyebrow">The essentials</p>
        <h2>Six ideas that make Microsoft 365 easier.</h2>
        <p>Begin with the section that fits your role today. Return whenever your responsibilities change.</p>`;
    }

    const game = document.querySelector(".unsure-section");
    if (game) {
      game.innerHTML = `
        <div><p class="eyebrow">Prefer to explore?</p><h2>Try a short KPC learning game.</h2><p>Use realistic situations to discover which area may be useful next.</p></div>
        <a class="button dark" href="index.html#games">Open the games</a>`;
    }
  }

  const observer = new MutationObserver(enhanceOverview);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(enhanceOverview, 0));
  enhanceOverview();
})();