import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

/**
 * Format a Date into a human-friendly time string.
 * We keep it in a helper to make the component easier to read/test.
 */
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// PUBLIC_INTERFACE
function App() {
  /** The current time, updated every second. */
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Update on an exact 1s interval.
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const timeText = useMemo(() => formatTime(now), [now]);

  return (
    <main className="App" aria-label="Digital clock application">
      <section className="clockCard" aria-label="Current time">
        <p className="clockLabel">Current time</p>
        <time className="clockTime" dateTime={now.toISOString()}>
          {timeText}
        </time>
      </section>
    </main>
  );
}

export default App;
