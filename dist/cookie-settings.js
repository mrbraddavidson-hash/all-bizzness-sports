(() => {
  const preferenceKey = "all-bizzness-cookie-preference";
  const readPreference = () => {
    try {
      return window.localStorage.getItem(preferenceKey) || "";
    } catch {
      return "";
    }
  };
  const savePreference = (value) => {
    try {
      window.localStorage.setItem(preferenceKey, value);
    } catch {
      // Privacy controls remain usable when browser storage is unavailable.
    }
  };

  const analyticsMeasurementId = "G-3ZNS2B38Q6";
  const loadAnalytics = () => {
    if (window.__allBizznessAnalyticsLoaded) return;
    window.__allBizznessAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", analyticsMeasurementId, { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
    script.dataset.allBizznessAnalytics = "true";
    document.head.appendChild(script);
  };
  const removeAnalytics = () => {
    document.querySelectorAll("script[data-all-bizzness-analytics]").forEach((script) => script.remove());
    document.cookie.split(";").forEach((entry) => {
      const name = entry.trim().split("=", 1)[0];
      if (/^_(?:ga|gid|gat)(?:_|$)/.test(name)) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      }
    });
    window.dataLayer = [];
    window.gtag = undefined;
    window.__allBizznessAnalyticsLoaded = false;
  };
  if (readPreference() === "accepted") loadAnalytics();

  document.querySelectorAll("#year").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const triggers = [...document.querySelectorAll("[data-cookie-settings]")];
  if (!triggers.length) return;

  const dialog = document.createElement("div");
  dialog.className = "cookie-settings";
  dialog.id = "cookie-settings-dialog";
  dialog.hidden = true;
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "cookie-settings-title");
  dialog.innerHTML = `
    <div class="cookie-settings__scrim" data-cookie-close="true" aria-hidden="true"></div>
    <section class="cookie-settings__panel">
      <div class="cookie-settings__topline">
        <p class="cookie-settings__eyebrow">Privacy choices</p>
        <button class="cookie-settings__close" type="button" data-cookie-close aria-label="Close cookie settings">×</button>
      </div>
      <h2 id="cookie-settings-title">Cookie settings.</h2>
      <p>All Bizzness Sports uses privacy-focused Cloudflare Web Analytics for technical traffic measurement. Optional Google Analytics helps us understand visits and only loads after you choose Accept. The scoreboard may request game data from an external sports API, and your browser may retain ordinary hosting or security data.</p>
      <p class="cookie-settings__status" role="status" aria-live="polite"></p>
      <div class="cookie-settings__actions">
        <button class="cookie-settings__button cookie-settings__button--secondary" type="button" data-cookie-reject>Reject optional cookies</button>
        <button class="cookie-settings__button" type="button" data-cookie-accept>Accept optional cookies</button>
      </div>
      <p class="cookie-settings__note">Your choice is saved in this browser for this site. You can change it any time through Cookie settings.</p>
    </section>
  `;
  document.body.append(dialog);

  let lastTrigger = null;
  const status = dialog.querySelector(".cookie-settings__status");
  const close = () => {
    dialog.hidden = true;
    document.body.classList.remove("cookie-settings-open");
    lastTrigger?.focus();
  };
  const open = (trigger) => {
    lastTrigger = trigger;
    dialog.hidden = false;
    document.body.classList.add("cookie-settings-open");
    const current = readPreference();
    status.textContent = current ? `Current preference: ${current}.` : "No preference saved yet.";
    dialog.querySelector("[data-cookie-reject]")?.focus();
  };

  triggers.forEach((trigger) => trigger.addEventListener("click", () => open(trigger)));
  dialog.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest("[data-cookie-close]")) {
      close();
      return;
    }
    const choice = target.closest("[data-cookie-accept], [data-cookie-reject]");
    if (!choice) return;
    const value = choice.hasAttribute("data-cookie-accept") ? "accepted" : "rejected";
    savePreference(value);
    if (value === "accepted") loadAnalytics();
    else removeAnalytics();
    status.textContent = `Preference saved: ${value}.`;
    close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll("button:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hidden) close();
  });

  if (!readPreference()) open(null);
})();
