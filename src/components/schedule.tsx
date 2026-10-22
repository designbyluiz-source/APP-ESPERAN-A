"use client";

import Link from "next/link";
import { useState } from "react";
import { assets } from "@/lib/figma-assets";
import { events } from "@/lib/content";
import { Divider, PageHeader } from "./ui";

export function Schedule() {
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [pastOpen, setPastOpen] = useState(true);
  const [upcomingOpen, setUpcomingOpen] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const isDesignMonth = month.getMonth() === 9 && month.getFullYear() === 2026;
  const firstOffset = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const rows = Math.ceil((daysInMonth + firstOffset) / 7);
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  })
    .format(month)
    .replace(" de ", " ");
  const monthLabel = label[0].toUpperCase() + label.slice(1);
  function changeMonth(delta: number) {
    setMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + delta, 1),
    );
    setSelectedDay(null);
    setExpanded(null);
  }
  const filtered = isDesignMonth
    ? events.filter(
        (event) => selectedDay === null || event.day === selectedDay,
      )
    : [];

  function eventCard(event: (typeof events)[number]) {
    const open = expanded === event.day;
    return (
      <article
        className={`event-card ${event.kind} ${open ? "expanded" : ""}`}
        key={event.day}
        id={`event-${event.day}`}
      >
        <button
          className="event-summary"
          onClick={() => setExpanded(open ? null : event.day)}
          aria-expanded={open}
          aria-label={`${event.title}, ${event.day} de outubro, ver detalhes`}
        >
          <span className="event-date">
            <span>{event.weekday}</span>
            <strong>{event.day}</strong>
            <span>Out</span>
          </span>
          <span className="event-copy">
            <strong>{event.title}</strong>
            <span>{event.time}</span>
            <small>{event.pastor}</small>
          </span>
          <span className="event-expand">
            {event.kind === "past" ? (
              <span className="past-badge">Enc.</span>
            ) : (
              <img
                className={open ? "is-reversed" : ""}
                src={
                  event.kind === "worship"
                    ? assets.schedule.imgChevronDown
                    : assets.schedule.imgChevronDown1
                }
                alt=""
              />
            )}
          </span>
        </button>
        {open && (
          <div className="event-details">
            <p>
              {event.kind === "past"
                ? "Este encontro já foi encerrado."
                : event.kind === "worship"
                  ? "Um tempo de comunhão, louvor e reflexão na Palavra."
                  : "Um encontro para aprender, compartilhar e crescer na fé."}
            </p>
            {event.kind === "worship" && (
              <Link href="/culto">Acompanhar nosso culto →</Link>
            )}
          </div>
        )}
      </article>
    );
  }

  return (
    <main className="section-screen" data-node-id="106:471">
      <PageHeader title="Nossa programação" />
      <div className="section-scroll schedule-content">
        <section className="calendar" aria-label={monthLabel}>
          <div className="calendar-heading">
            <button
              className="calendar-arrow"
              aria-label="Mês anterior"
              onClick={() => changeMonth(-1)}
            >
              <img src={assets.schedule.imgChevronLeft1} alt="" />
            </button>
            <h2 aria-live="polite">{monthLabel}</h2>
            <button
              className="calendar-arrow"
              aria-label="Próximo mês"
              onClick={() => changeMonth(1)}
            >
              <img
                className="is-reversed"
                src={assets.schedule.imgChevronLeft2}
                alt=""
              />
            </button>
          </div>
          <div className="weekdays" aria-hidden="true">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-days">
            {Array.from({ length: rows * 7 }, (_, index) => {
              const date = new Date(
                month.getFullYear(),
                month.getMonth(),
                index - firstOffset + 1,
              );
              const inMonth = date.getMonth() === month.getMonth();
              const day = date.getDate();
              const event =
                inMonth && isDesignMonth
                  ? events.find((item) => item.day === day)
                  : undefined;
              const dayLabel = inMonth
                ? `${day} de ${monthLabel}${event ? `, ${event.title}` : ""}`
                : new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "long",
                  }).format(date);
              return (
                <button
                  key={index}
                  disabled={!inMonth}
                  className={`calendar-day ${!inMonth ? "other-month" : ""} ${event?.kind ?? ""} ${selectedDay === day && inMonth ? "selected" : ""}`}
                  aria-label={dayLabel}
                  aria-pressed={inMonth && selectedDay === day}
                  onClick={() =>
                    setSelectedDay((current) => (current === day ? null : day))
                  }
                >
                  {!inMonth && day < 10 ? String(day).padStart(2, "0") : day}
                </button>
              );
            })}
          </div>
        </section>
        <Divider src={assets.schedule.imgLine31} />
        <div className="event-sections" aria-live="polite">
          {selectedDay !== null && (
            <button
              className="clear-filter"
              onClick={() => setSelectedDay(null)}
            >
              Dia {selectedDay} · Ver todos os eventos ×
            </button>
          )}
          {filtered.some((event) => event.kind === "past") && (
            <section>
              <button
                className="event-section-heading previous"
                onClick={() => setPastOpen((current) => !current)}
                aria-expanded={pastOpen}
              >
                <h2>Últimos eventos</h2>
                <img
                  className={pastOpen ? "is-reversed" : ""}
                  src={assets.schedule.imgIcon1}
                  alt=""
                />
              </button>
              {pastOpen && (
                <div className="event-list">
                  {filtered
                    .filter((event) => event.kind === "past")
                    .map(eventCard)}
                </div>
              )}
            </section>
          )}
          {filtered.some((event) => event.kind !== "past") && (
            <section>
              <button
                className="event-section-heading"
                onClick={() => setUpcomingOpen((current) => !current)}
                aria-expanded={upcomingOpen}
              >
                <h2>Próximos eventos</h2>
                <img
                  className={
                    upcomingOpen ? "flip-y is-reversed" : "is-reversed"
                  }
                  src={assets.schedule.imgIcon2}
                  alt=""
                />
              </button>
              {upcomingOpen && (
                <div className="event-list">
                  {filtered
                    .filter((event) => event.kind !== "past")
                    .map(eventCard)}
                </div>
              )}
            </section>
          )}
          {!filtered.length && (
            <div className="empty-events">
              <h2>Nenhum encontro por aqui</h2>
              <p>
                {selectedDay
                  ? "Escolha outro dia para conferir a programação."
                  : "A programação deste mês ainda não está disponível na demonstração."}
              </p>
              <button
                className="primary-action"
                onClick={() => {
                  setMonth(new Date(2026, 9, 1));
                  setSelectedDay(null);
                }}
              >
                Ver programação de outubro
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
