(() => {
  function navigate(destination) {
    if (!destination) {
      history.pushState(null, "", "learn.html");
    } else {
      history.pushState(null, "", `#${destination}`);
    }

    const navigationEvent = typeof PopStateEvent === "function"
      ? new PopStateEvent("popstate")
      : new Event("popstate");

    window.dispatchEvent(navigationEvent);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-go]");
    if (!trigger) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(trigger.dataset.go || "");
  }, true);
})();