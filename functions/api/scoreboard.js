const UPSTREAMS = {
  nhl: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
  mlb: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
  nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
  nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  cfl: "https://site.api.espn.com/apis/site/v2/sports/football/cfl/scoreboard"
};

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
  "CDN-Cache-Control": "public, max-age=60",
  "Access-Control-Allow-Origin": "https://all-bizzness-sports.pages.dev",
  "Vary": "Accept-Encoding, Origin",
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000",
  "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin"
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS
  });
}

function compactEvents(data) {
  return (data.events || []).map((event) => {
    const competition = event.competitions?.[0];
    if (!competition) return null;

    return {
      date: event.date,
      competitions: [{
        competitors: (competition.competitors || []).map((competitor) => ({
          homeAway: competitor.homeAway,
          score: competitor.score,
          team: {
            abbreviation: competitor.team?.abbreviation,
            shortDisplayName: competitor.team?.shortDisplayName
          }
        })),
        status: {
          type: competition.status?.type || {}
        }
      }]
    };
  }).filter(Boolean);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...JSON_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const league = url.searchParams.get("league")?.toLowerCase();
  const upstreamUrl = UPSTREAMS[league];

  if (!upstreamUrl) {
    return json({ error: "Unsupported scoreboard league." }, 400);
  }

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!upstream.ok) {
      return json({ error: "The scoreboard provider is unavailable." }, 502);
    }

    const data = await upstream.json();
    return json({ events: compactEvents(data) });
  } catch {
    return json({ error: "The scoreboard provider is unavailable." }, 502);
  }
}
