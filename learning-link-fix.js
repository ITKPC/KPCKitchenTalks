(() => {
  function convertControls() {
    document.querySelectorAll("button[data-go]").forEach(button => {
      const destination = button.dataset.go || "";
      const link = document.createElement("a");
      link.className = button.className;
      link.href = destination ? `learn.html#${destination}` : "learn.html";
      link.innerHTML = button.innerHTML;

      for (const attribute of button.attributes) {
        if (attribute.name === "class" || attribute.name === "data-go") continue;
        link.setAttribute(attribute.name, attribute.value);
      }

      if (destination.startsWith("path/")) {
        link.textContent = button.closest(".lesson-actions") ? "← Back to lessons" : button.textContent;
      }

      button.replaceWith(link);
    });
  }

  const observer = new MutationObserver(convertControls);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => setTimeout(convertControls, 0));
  convertControls();
})();