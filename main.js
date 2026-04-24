const EVENTS_FILE = "data/events.txt";

const nextTitle = document.getElementById("next-event-title");
const nextDate = document.getElementById("next-event-date");
const nextLocation = document.getElementById("next-event-location");
const nextNotes = document.getElementById("next-event-notes");

const featuredTitle = document.getElementById("featured-event-title");
const featuredDate = document.getElementById("featured-event-date");
const featuredLocation = document.getElementById("featured-event-location");
const featuredNotes = document.getElementById("featured-event-notes");

const eventsList = document.getElementById("events-list");

function parseEventsFile(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [date, startTime, endTime, location, title, notes] = line.split("|");
      return { date, startTime, endTime, location, title, notes };
    })
    .filter((event) => event.date && event.startTime && event.location && event.title)
    .sort((a, b) => new Date(`${a.date}T${a.startTime}:00`) - new Date(`${b.date}T${b.startTime}:00`));
}

function eventDateTime(event) {
  return new Date(`${event.date}T${event.startTime}:00`);
}

function formatDate(event) {
  const date = eventDateTime(event);
  const datePart = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  if (event.endTime) {
    return `${datePart} • ${event.startTime} – ${event.endTime}`;
  }

  return `${datePart} • ${event.startTime}`;
}

function renderHighlightedEvent(event) {
  const title = event ? event.title : "Aucune date publiée";
  const date = event ? formatDate(event) : "Ajoutez une date dans le fichier data/events.txt";
  const location = event ? event.location : "";
  const notes = event ? event.notes : "";

  const skeleton = document.getElementById("next-event-skeleton");
  const content = document.getElementById("next-event-content");

  if (skeleton && content) {
    skeleton.style.display = "none";
    content.style.display = "block";
  }

  if (nextTitle) nextTitle.textContent = title;
  if (nextDate) nextDate.textContent = date;
  if (nextLocation) nextLocation.textContent = location;
  if (nextNotes) nextNotes.textContent = notes;

  if (featuredTitle) featuredTitle.textContent = title;
  if (featuredDate) featuredDate.textContent = date;
  if (featuredLocation) featuredLocation.textContent = location;
  if (featuredNotes) featuredNotes.textContent = notes;
}

function renderEvents(events, nextEvent) {
  eventsList.innerHTML = "";

  if (!events.length) {
    const emptyState = document.createElement("p");
    emptyState.textContent = "Aucun événement n’est disponible pour le moment.";
    eventsList.appendChild(emptyState);
    return;
  }

  events.forEach((event) => {
    const item = document.createElement("article");
    item.className = "event-item";

    if (nextEvent && event.date === nextEvent.date && event.startTime === nextEvent.startTime) {
      item.classList.add("is-next");
    }

    const now = new Date();
    if (eventDateTime(event) < now) {
      item.classList.add("past-event");
    }

    const title = document.createElement("strong");
    title.textContent = event.title;

    const time = document.createElement("time");
    time.dateTime = `${event.date}T${event.startTime}`;
    time.textContent = formatDate(event);

    const location = document.createElement("span");
    location.textContent = event.location;

    const notes = document.createElement("span");
    notes.textContent = event.notes || "";

    item.append(title, time, location, notes);
    eventsList.appendChild(item);
  });
}

async function loadEvents() {
  try {
    const response = await fetch(EVENTS_FILE, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Impossible de charger ${EVENTS_FILE}`);
    }

    const text = await response.text();
    const allEvents = parseEventsFile(text);
    const now = new Date();
    
    // Prochain événement (le premier dans le futur, ou le dernier si tout est passé)
    const nextEvent = allEvents.find((event) => eventDateTime(event) >= now) || allEvents[allEvents.length - 1] || null;
    
    // Afficher tous les événements (passés et futurs) avec un style différent pour les passés
    renderHighlightedEvent(nextEvent);
    renderEvents(allEvents, nextEvent);
  } catch (error) {
    renderHighlightedEvent(null);
    eventsList.innerHTML = "<p>Le calendrier n’a pas pu être chargé.</p>";
    console.error(error);
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuBtn || !mainNav) return;

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !isExpanded);
    mainNav.classList.toggle("open");
  }

  menuBtn.addEventListener("click", toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("open")) {
        toggleMenu();
      }
    });
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

// Set current year in footer
// Modal Management
function initLegalModal() {
  const modal = document.getElementById("legal-modal");
  const openBtn = document.getElementById("open-legal");
  const closeBtn = document.getElementById("close-modal");

  if (!modal || !openBtn || !closeBtn) return;

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent scroll
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
  };

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

function setFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  initMobileMenu();
  initScrollReveal();
  setFooterYear();
  initLegalModal();
  initBackToTop();
});
