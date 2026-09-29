const topicContent = {
  diamond: {
    number: "01",
    kicker: "Baseball",
    title: "The local diamond deserves a spotlight.",
    copy: "From first pitch to late-inning drama, local baseball gives the community another reason to show up."
  },
  rink: {
    number: "02",
    kicker: "Hockey",
    title: "Every rink has a story.",
    copy: "From Tweed to Trenton and Frankford, local hockey runs on pace, pride, and people who keep showing up."
  },
  locker: {
    number: "03",
    kicker: "Community",
    title: "The score is only part of the story.",
    copy: "The best sports conversations live in the details, the rivalries, and the people behind the score."
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
