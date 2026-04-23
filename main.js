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

  nextTitle.textContent = title;
  nextDate.textContent = date;
  nextLocation.textContent = location;
  nextNotes.textContent = notes;

  featuredTitle.textContent = title;
  featuredDate.textContent = date;
  featuredLocation.textContent = location;
  featuredNotes.textContent = notes;
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
    const events = parseEventsFile(text);
    const now = new Date();
    const nextEvent = events.find((event) => eventDateTime(event) >= now) || events[events.length - 1] || null;

    renderHighlightedEvent(nextEvent);
    renderEvents(events, nextEvent);
  } catch (error) {
    renderHighlightedEvent(null);
    eventsList.innerHTML = "<p>Le calendrier n’a pas pu être chargé.</p>";
    console.error(error);
  }
}

loadEvents();
