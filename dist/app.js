const ENDPOINTS = [
  { league: "NHL", url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard" },
  { league: "MLB", url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard" },
  { league: "NBA", url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard" },
  { league: "NFL", url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard" },
  { league: "CFL", url: "https://site.api.espn.com/apis/site/v2/sports/football/cfl/scoreboard" }
];

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[character]));

async function fetchLeague(endpoint) {
  try {
    const res = await fetch(endpoint.url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    const data = await res.json();

    return (data.events || []).map((event) => {
      const comp = event.competitions?.[0];
      if (!comp) return null;

      const home = comp.competitors?.find((competitor) => competitor.homeAway === "home");
      const away = comp.competitors?.find((competitor) => competitor.homeAway === "away");
      const status = comp.status?.type || {};

      return {
        league: endpoint.league,
        state: status.state || "pre",
        detail: status.shortDetail || status.detail || "Scheduled",
        away: {
          code: away?.team?.abbreviation || away?.team?.shortDisplayName || "AWAY",
          score: away?.score ?? "0",
          logo: away?.team?.logo || ""
        },
        home: {
          code: home?.team?.abbreviation || home?.team?.shortDisplayName || "HOME",
          score: home?.score ?? "0",
          logo: home?.team?.logo || ""
        }
      };
    }).filter(Boolean);
  } catch (err) {
    return [];
  }
}

function renderTeam(team, showScore) {
  const logo = team.logo
    ? `<img class="team-logo" src="${escapeHtml(team.logo)}" alt="" loading="lazy" />`
    : "";
  const score = showScore ? `<span class="score">${escapeHtml(team.score)}</span>` : "";

  return `
    <span class="team-item">
      ${logo}
      <span>${escapeHtml(team.code)}</span>
      ${score}
    </span>
  `;
}

function renderCard(game) {
  const isLive = game.state === "in";
  const isPre = game.state === "pre";
  const statusClass = isLive ? "status-live" : (isPre ? "status-pre" : "status-final");

  return `
    <div class="ticker-card">
      <span class="ticker-badge">${escapeHtml(game.league)}</span>
      ${renderTeam(game.away, !isPre)}
      <span class="score-divider">${isPre ? "vs" : "@"}</span>
      ${renderTeam(game.home, !isPre)}
      <span class="status ${statusClass}">${isLive ? "● " : ""}${escapeHtml(game.detail)}</span>
    </div>
  `;
}

async function refreshTicker() {
  const track = document.getElementById("tickerTrack");
  const updated = document.getElementById("tickerUpdated");
  if (!track) return;

  const results = await Promise.all(ENDPOINTS.map(fetchLeague));
  const games = results.flat();

  if (!games.length) {
    track.classList.add("is-static");
    track.innerHTML = '<div class="ticker-card ticker-card-empty">No live or scheduled games across selected leagues today.</div>';
  } else {
    const order = { in: 0, pre: 1, post: 2 };
    games.sort((a, b) => (order[a.state] ?? 3) - (order[b.state] ?? 3));
    const cardsHtml = games.map(renderCard).join("");
    track.classList.remove("is-static");
    track.innerHTML = cardsHtml + cardsHtml;
  }

  if (updated) {
    updated.textContent = `Updated ${new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date())}`;
  }
}

const scheduleTickerRefresh = () => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => refreshTicker(), { timeout: 1200 });
  } else {
    window.setTimeout(refreshTicker, 350);
  }
};

scheduleTickerRefresh();
setInterval(refreshTicker, 60000);

const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

const setMenuState = (isOpen) => {
  nav?.classList.toggle("is-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  const screenReaderLabel = menuToggle?.querySelector(".sr-only");
  if (screenReaderLabel) screenReaderLabel.textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
};

menuToggle?.addEventListener("click", () => {
  setMenuState(!nav?.classList.contains("is-open"));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("is-open")) return;
  if (!nav.contains(event.target) && !menuToggle?.contains(event.target)) setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

const revealItems = document.querySelectorAll(".reveal");
const revealItemsAboveViewport = () => {
  const viewportBottom = window.scrollY + window.innerHeight;

  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top + window.scrollY;
    if (itemTop < viewportBottom) item.classList.add("is-visible");
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
  requestAnimationFrame(revealItemsAboveViewport);
  window.addEventListener("hashchange", () => requestAnimationFrame(revealItemsAboveViewport));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();
