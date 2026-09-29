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
  15: { kicker: "All Gas", title: "All Gas", description: "Maximum voltage: lime streaks, oversized type, and a highlight-reel pace that never sits still.", palette: "Lime / ink / electric blue", best: "A younger, fast-cut, high-energy audience" },
  16: { kicker: "Newsprint Dispatch", title: "Newsprint Dispatch", description: "A sharp, ink-heavy editorial system that treats every episode like the morning's must-read sports section.", palette: "Paper / ink / signal red", best: "Features, recaps, and local front-page stories" },
  17: { kicker: "Acid Console", title: "Acid Console", description: "A fluorescent control room for instant reactions, live chatter, and a scoreboard that never sleeps.", palette: "Acid lime / dark green / black", best: "Live coverage, reaction clips, and fast updates" },
  18: { kicker: "Ice Breaker", title: "Ice Breaker", description: "A restrained northern-inspired direction with a cool palette and enough breathing room for smart analysis.", palette: "Ice blue / mist / deep teal", best: "Hockey, winter sports, and thoughtful discussion" },
  19: { kicker: "Sunset FM", title: "Sunset FM", description: "A warm broadcast identity made for road trips, late innings, and the conversation that continues after the final whistle.", palette: "Sunset orange / coral / violet", best: "Audio-led campaigns and evening episodes" },
  20: { kicker: "Primary Playbook", title: "Primary Playbook", description: "A graphic, optimistic system built from primary blocks, clean geometry, and an unmistakably local point of view.", palette: "Cream / red / cobalt / yellow", best: "Community sports, merch, and posters" },
  21: { kicker: "No Rules Type", title: "No Rules Type", description: "A pure typographic punch designed to put the hot take front and center before the intro music even starts.", palette: "Signal red / black", best: "A loud wordmark, social cards, and short-form video" },
  22: { kicker: "Prism League", title: "Prism League", description: "A refracted, high-energy identity where every opinion is another color in the same conversation.", palette: "Violet / cyan / hot pink / acid", best: "Multi-angle debates and energetic social cuts" },
  23: { kicker: "Channel 24", title: "Channel 24", description: "A hot-orange cable sports package with breaking-news urgency and a permanent ON AIR light.", palette: "Orange / cream / signal yellow", best: "Call-ins, breaking updates, and live shows" },
  24: { kicker: "Dust Bowl Sports", title: "Dust Bowl Sports", description: "A sunbaked heritage direction that gives local sports the weathered authority of an old county scorecard.", palette: "Sand / brick / dark brown", best: "Baseball, county leagues, and hometown history" },
  25: { kicker: "Film Room", title: "Film Room", description: "A cinematic frame-by-frame approach for the episode that wants to slow the play down and notice everything.", palette: "Forest / sepia / antique gold", best: "Breakdowns, interviews, and deeper analysis" },
  26: { kicker: "Sticker League", title: "Sticker League", description: "A playful sticker-bomb system with enough personality to make a community sports brand feel collectible.", palette: "Yellow / pink / cobalt", best: "Merch, youth sports, and social-first promotion" },
  27: { kicker: "White Space Club", title: "White Space Club", description: "A quiet, confident direction that lets the hosts, the episode title, and the story do the heavy lifting.", palette: "Warm white / forest / coral", best: "Interviews, profiles, and clean digital editorial" },
  28: { kicker: "Future Court", title: "Future Court", description: "A cobalt-and-orange future-sports language for a show that wants to feel one step ahead of the next play.", palette: "Cobalt / orange / electric blue", best: "Next-generation sports coverage and data" },
  29: { kicker: "Ultraviolet Call-In", title: "Ultraviolet Call-In", description: "A midnight-purple call-in world for the debates that get better after the lights go down.", palette: "Ultraviolet / midnight / acid yellow", best: "Late-night episodes and open-phone debates" },
  30: { kicker: "County Fair Scorecard", title: "County Fair Scorecard", description: "A bright, friendly community direction with pennants, summer color, and a little hometown spectacle.", palette: "Teal / butter yellow / red", best: "Community events, youth leagues, and local reach" },
  31: { kicker: "Sunburst Standard", title: "Sunburst Standard", description: "A graphic gold-and-black identity that turns the local angle into a full-volume, all-day signal.", palette: "Gold / black", best: "A flagship identity, signage, and bold apparel" },
  32: { kicker: "Lavender Press", title: "Lavender Press", description: "A gentle editorial route with a surprisingly strong point of view and a little room for nuance.", palette: "Lavender / lilac / plum", best: "Features, community profiles, and thoughtful stories" },
  33: { kicker: "Pixel Box Score", title: "Pixel Box Score", description: "A retro arcade scoreboard translated into a modern sports-talk system full of bright little signals.", palette: "Navy / mint / magenta / yellow", best: "Scores, rankings, games, and social clips" },
  34: { kicker: "Woodcut Rink", title: "Woodcut Rink", description: "A textured field-notes direction for stories with roots, weather, and a long memory of the game.", palette: "Pine / oat / brick", best: "Hockey, outdoor sport, and local history" },
  35: { kicker: "Bubblegum Broadcast", title: "Bubblegum Broadcast", description: "A candy-colored identity that makes the community angle feel welcoming, surprising, and impossible to miss.", palette: "Pink / orange / cobalt / cream", best: "A welcoming front door for new listeners" }
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
  const styleClass = id <= 15 ? `style-${String(id).padStart(2, "0")}` : `more-style-${String(id - 15).padStart(2, "0")}`;
  modalSwatch.className = `modal-swatch ${styleClass}`;
  modalIndex.textContent = `${String(id).padStart(2, "0")} / 35`;
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
