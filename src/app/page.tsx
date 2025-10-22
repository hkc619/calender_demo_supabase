"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);

  const loadEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(
      data.map((e: any) => ({
        id: e.id,
        title: e.title,
        start: e.start_time,
        end: e.end_time,
      }))
    );
  };

  const handleDateClick = async (info: any) => {
    const title = prompt("Add a meal or event:");
    if (title) {
      const start = new Date(info.dateStr).toISOString();
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          mealType: "custom",
          startTime: start,
          endTime: start,
        }),
      });
      loadEvents();
    }
  };

  const handleEventClick = async (info: any) => {
    const confirmDelete = confirm(`Delete "${info.event.title}"?`);
    if (confirmDelete) {
      await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: info.event.id }),
      });
      loadEvents();
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🗓️ Supabase Calendar Demo
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="80vh"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </main>
  );
}
