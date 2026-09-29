const topicContent = {
  diamond: {
    number: "01",
    kicker: "The diamond",
    title: "Every inning has a story.",
    copy: "From first pitch to late-inning drama, the diamond is where patience turns into pressure."
  },
  rink: {
    number: "02",
    kicker: "The rink",
    title: "Fast game. Faster opinions.",
    copy: "The rink is all pace, momentum, and moments that can flip a whole conversation in seconds."
  },
  locker: {
    number: "03",
    kicker: "The locker room",
    title: "The score is never the whole story.",
    copy: "The best sports conversations live in the details, the rivalries, and the stories behind the score."
  }
};

const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const panelNumber = document.querySelector("#panel-number");
const panelKicker = document.querySelector("#panel-kicker");
const panelTitle = document.querySelector("#panel-title");
const panelCopy = document.querySelector("#panel-copy");

document.querySelectorAll(".topic-button").forEach((button) => {
  button.addEventListener("click", () => {
    const content = topicContent[button.dataset.topic];
    if (!content) return;

    document.querySelectorAll(".topic-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });

    panelNumber.textContent = content.number;
    panelKicker.textContent = content.kicker;
    panelTitle.textContent = content.title;
    panelCopy.textContent = content.copy;
  });
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
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();
