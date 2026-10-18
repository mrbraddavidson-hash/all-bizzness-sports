(() => {
  const filterRoot = document.querySelector("[data-local-area-filters]");
  if (!filterRoot) return;

  const buttons = [...filterRoot.querySelectorAll("[data-local-area]")];
  const cards = [...document.querySelectorAll("[data-local-card]")];
  const status = filterRoot.querySelector("[data-local-area-status]");
  const labels = {
    all: "all local coverage",
    tweed: "Tweed coverage",
    hastings: "Hastings coverage",
    quinte: "Quinte coverage",
    frankford: "Frankford coverage",
    trenton: "Trenton coverage",
    "centre-hastings": "Centre Hastings coverage"
  };

  const applyFilter = (area) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const areas = (card.dataset.localAreas || "").split(",").filter(Boolean);
      const isVisible = area === "all" || areas.includes(area);
      card.hidden = !isVisible;
      card.classList.toggle("is-area-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.localArea === area;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (status) {
      status.textContent = `${visibleCount} cards · ${labels[area] || "local coverage"}`;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.localArea || "all"));
  });

  applyFilter("all");
})();
