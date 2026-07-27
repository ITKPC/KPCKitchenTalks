(() => {
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-go]");
    if (!trigger) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const destination = trigger.dataset.go || "";
    const target = destination ? `learn.html#${destination}` : "learn.html";
    window.location.assign(target);
  }, true);
})();