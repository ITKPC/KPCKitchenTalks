(() => {
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function enhanceHelpPanel() {
    const help = window.KPCLearning?.helpContact;
    const panel = document.querySelector(".help-block");
    if (!help || !panel || panel.dataset.helpEnhanced === "true") return;

    panel.dataset.helpEnhanced = "true";
    panel.innerHTML = `
      <p class="block-label">Need a hand?</p>
      <h2>Try these steps</h2>
      <div class="help-steps">
        <div class="help-step">
          <span class="help-step-number" aria-hidden="true">1</span>
          <div>
            <h3>Ask someone you work with</h3>
            <p>${escapeHtml(help.peerHelp || "Start by asking another board or committee member for help.")}</p>
          </div>
        </div>
        <div class="help-step">
          <span class="help-step-number" aria-hidden="true">2</span>
          <div>
            <h3>Still stuck? Contact the KPC Technology Team</h3>
            <p>${escapeHtml(help.instructions)}</p>
            <p><a class="help-email" href="mailto:ITConsult@kamloopspickleballclub.ca">ITConsult@kamloopspickleballclub.ca</a></p>
          </div>
        </div>
      </div>
      <aside class="security-reminder"><strong>Protect your account:</strong> ${escapeHtml(help.safety || "Never send your password or multifactor authentication code.")}</aside>`;
  }

  const observer = new MutationObserver(enhanceHelpPanel);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(enhanceHelpPanel, 0));
  enhanceHelpPanel();
})();