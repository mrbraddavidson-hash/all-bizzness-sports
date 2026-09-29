const conceptDetails = {
  1: { kicker: "Redline / Arena", title: "Redline Arena", description: "Broadcast grit meets playoff energy: the loudest, most immediate version of the show.", palette: "Red / black / white", best: "A high-impact homepage or launch campaign" },
  2: { kicker: "Midnight Broadcast", title: "Midnight Broadcast", description: "A live booth feeling with cool monitor light, late-night pacing, and a built-in sense of urgency.", palette: "Navy / cyan / signal yellow", best: "Live show coverage and late-night drops" },
  3: { kicker: "Chrome League", title: "Chrome League", description: "A premium sportswear direction with metallic surfaces, hard angles, and a polished badge system.", palette: "Chrome / graphite / white", best: "A premium network or sponsor-facing look" },
  4: { kicker: "Locker Tape", title: "Locker Tape", description: "Tactile sideline texture, paper notes, and warm utility color make the show feel close to the action.", palette: "Parchment / forest / orange", best: "A conversational, behind-the-scenes identity" },
  5: { kicker: "Neon Overtime", title: "Neon Overtime", description: "A nightlife-ready sports system that feels made for highlight clips, reaction posts, and after-dark debates.", palette: "Violet / hot pink / acid lime", best: "Short-form video and social-first promotion" },
  6: { kicker: "Playoff Gold", title: "Playoff Gold", description: "The prestige route: dark, restrained, and championship-minded without losing the show’s edge.", palette: "Black / antique gold / espresso", best: "A flagship season or playoff special" },
  7: { kicker: "Rink Lights", title: "Rink Lights", description: "Clean ice-blue space, crisp arcs, and cool contrast give the mark a fast, modern arena feel.", palette: "Ice blue / navy / white", best: "A hockey-forward or winter sports edition" },
  8: { kicker: "Streetball Poster", title: "Streetball Poster", description: "A screen-printed neighborhood energy with offset ink, bold blocks, and a little beautiful roughness.", palette: "Orange / cobalt / cream", best: "Local reach, merch, and poster-led promotion" },
  9: { kicker: "Sunday Studio", title: "Sunday Studio", description: "A softer clubhouse mood that still feels designed: warm, human, and easy to spend time inside.", palette: "Peach / moss / butter", best: "A weekly recap or relaxed weekend show" },
  10: { kicker: "Scoreboard Grid", title: "Scoreboard Grid", description: "A digital stats-room direction built from grids, readouts, and a little old-school green-screen attitude.", palette: "Deep green / neon green / ink", best: "Stats, picks, rankings, and data-led segments" },
  11: { kicker: "Radio Afterdark", title: "Radio Afterdark", description: "Warm static and microphone glow make this feel like the best part of the call-in show after midnight.", palette: "Burnt orange / espresso / cream", best: "Audio-led campaigns and talk-heavy episodes" },
  12: { kicker: "Varsity Vault", title: "Varsity Vault", description: "Collegiate stripes and hometown pride give the show a classic identity with plenty of room to modernize.", palette: "Navy / cardinal / varsity cream", best: "Community, alumni, and hometown sports" },
  13: { kicker: "Heat Check", title: "Heat Check", description: "A full-sun sports system made for summer, hot streaks, and the kind of take that needs a warning label.", palette: "Sun yellow / orange / red", best: "Seasonal campaigns and energetic social cuts" },
  14: { kicker: "Press Box", title: "Press Box", description: "The sports page becomes the show page: editorial columns, extra-extra energy, and a sharper point of view.", palette: "Newsprint / burgundy / ink", best: "Interviews, features, and long-form storytelling" },
  15: { kicker: "All Gas", title: "All Gas", description: "Maximum voltage: lime streaks, oversized type, and a highlight-reel pace that never sits still.", palette: "Lime / ink / electric blue", best: "A younger, fast-cut, high-energy audience" }
};

const cards = [...document.querySelectorAll(".concept-card")];
const filters = [...document.querySelectorAll(".filter-button")];
const visibleCount = document.querySelector("#visible-count");
const modal = document.querySelector("#detail-modal");
const modalSwatch = document.querySelector("#modal-swatch");
const modalIndex = document.querySelector("#modal-index");
const modalKicker = document.querySelector("#modal-kicker");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalPalette = document.querySelector("#modal-palette");
const modalBest = document.querySelector("#modal-best");
let activeFilter = "all";
let activeCardIndex = 0;

function matchingCards() {
  return cards.filter((card) => !card.classList.contains("is-hidden"));
}

function renderFilter(filter) {
  activeFilter = filter;
  cards.forEach((card) => {
    const visible = filter === "all" || card.dataset.category.split(" ").includes(filter);
    card.classList.toggle("is-hidden", !visible);
  });
  filters.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === filter));
  const visible = matchingCards().length;
  visibleCount.textContent = filter === "all" ? "Showing all directions" : `Showing ${visible} ${filter} directions`;
}

filters.forEach((button) => {
  button.addEventListener("click", () => renderFilter(button.dataset.filter));
});

function renderModal(card) {
  const id = Number(card.dataset.id);
  const details = conceptDetails[id];
  modalSwatch.className = `modal-swatch style-${String(id).padStart(2, "0")}`;
  modalIndex.textContent = `${String(id).padStart(2, "0")} / 15`;
  modalKicker.textContent = details.kicker;
  modalTitle.textContent = details.title;
  modalDescription.textContent = details.description;
  modalPalette.textContent = details.palette;
  modalBest.textContent = details.best;
}

function openModal(card) {
  activeCardIndex = matchingCards().indexOf(card);
  renderModal(card);
  modal.showModal();
}

document.querySelectorAll(".concept-open").forEach((button) => {
  button.addEventListener("click", () => openModal(button.closest(".concept-card")));
});

document.querySelector("[data-modal-close]")?.addEventListener("click", () => modal.close());
modal?.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

function moveModal(direction) {
  const visible = matchingCards();
  if (!visible.length) return;
  activeCardIndex = (activeCardIndex + direction + visible.length) % visible.length;
  renderModal(visible[activeCardIndex]);
}

document.querySelector("[data-modal-prev]")?.addEventListener("click", () => moveModal(-1));
document.querySelector("[data-modal-next]")?.addEventListener("click", () => moveModal(1));

document.addEventListener("keydown", (event) => {
  if (!modal?.open) return;
  if (event.key === "ArrowLeft") moveModal(-1);
  if (event.key === "ArrowRight") moveModal(1);
});

const requestedSet = new URLSearchParams(window.location.search).get("set");
if (requestedSet === "flash-15") document.body.dataset.set = requestedSet;
