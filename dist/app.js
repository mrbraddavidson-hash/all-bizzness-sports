const ENDPOINTS = [
  { league: "NHL", url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard" },
  { league: "MLB", url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard" },
  { league: "NBA", url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard" },
  { league: "NFL", url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard" },
  { league: "CFL", url: "https://site.api.espn.com/apis/site/v2/sports/football/cfl/scoreboard" }
];

const MAX_SCORE_AGE_MS = 36 * 60 * 60 * 1000;
const MAX_SCORE_LEAD_MS = 10 * 24 * 60 * 60 * 1000;

function isUsableEvent(event, now = Date.now()) {
  const eventTime = Date.parse(event?.date || "");
  if (!Number.isFinite(eventTime)) return false;

  const state = event.competitions?.[0]?.status?.type?.state || "pre";
  if (state === "post") return eventTime >= now - MAX_SCORE_AGE_MS;
  return eventTime >= now - MAX_SCORE_AGE_MS && eventTime <= now + MAX_SCORE_LEAD_MS;
}

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

    return (data.events || []).filter((event) => isUsableEvent(event)).map((event) => {
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
  const tickerStatus = document.getElementById("tickerStatus");
  if (!track) return;

  if (document.hidden) return;

  const results = await Promise.all(ENDPOINTS.map(fetchLeague));
  const games = results.flat();

  if (!games.length) {
    track.classList.add("is-static");
    track.innerHTML = '<div class="ticker-card ticker-card-empty">No live or scheduled games across selected leagues today.</div>';
    if (tickerStatus) tickerStatus.textContent = "No current live or scheduled games are available.";
  } else {
    const order = { in: 0, pre: 1, post: 2 };
    games.sort((a, b) => (order[a.state] ?? 3) - (order[b.state] ?? 3));
    const cardsHtml = games.map(renderCard).join("");
    track.classList.remove("is-static");
    track.innerHTML = `<div class="ticker-sequence">${cardsHtml}</div><div class="ticker-sequence" aria-hidden="true">${cardsHtml}</div>`;
    if (tickerStatus) tickerStatus.textContent = `${games.length} current scoreboard games updated.`;
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
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshTicker();
});

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

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px 20% 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();
