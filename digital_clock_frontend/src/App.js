import React, { useEffect, useMemo, useState } from "react";

/**
 * Format a Date into a human-friendly digital time string.
 * Uses the user's locale and preserves seconds to emphasize real-time updating.
 */
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

/**
 * Returns a human-friendly date string for context under the clock.
 */
function formatDate(date) {
  return date.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * Align a ticking callback to the next exact second boundary, then run every second.
 * This reduces visible drift compared to a plain setInterval(1000).
 */
function startSecondAlignedTicker(onTick) {
  const now = Date.now();
  const msUntilNextSecond = 1000 - (now % 1000);

  const timeoutId = window.setTimeout(() => {
    onTick();
    const intervalId = window.setInterval(onTick, 1000);

    // Return a cleanup function that clears the interval.
    // (We can't return it directly to the caller from inside setTimeout,
    // so the outer function returns a cleanup that clears both.)
    startSecondAlignedTicker._intervalId = intervalId;
  }, msUntilNextSecond);

  return () => {
    window.clearTimeout(timeoutId);
    if (startSecondAlignedTicker._intervalId) {
      window.clearInterval(startSecondAlignedTicker._intervalId);
      startSecondAlignedTicker._intervalId = null;
    }
  };
}

// PUBLIC_INTERFACE
function App() {
  /** This is the main application component that renders a centered digital clock. */
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Keep the clock accurately updating on second boundaries.
    const stop = startSecondAlignedTicker(() => setNow(new Date()));
    return stop;
  }, []);

  const timeText = useMemo(() => formatTime(now), [now]);
  const dateText = useMemo(() => formatDate(now), [now]);

  return (
    <main style={styles.page}>
      <section style={styles.card} aria-label="Digital clock">
        <h1 style={styles.title}>Digital Clock</h1>
        <div style={styles.time} role="timer" aria-live="polite" aria-atomic="true">
          {timeText}
        </div>
        <div style={styles.date}>{dateText}</div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, rgba(59,130,246,0.10), #f9fafb)",
    padding: 16,
    color: "#111827",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"'
  },
  card: {
    width: "min(640px, 100%)",
    background: "#ffffff",
    borderRadius: 16,
    padding: "28px 24px",
    boxShadow: "0 10px 25px rgba(17, 24, 39, 0.08)",
    border: "1px solid rgba(100, 116, 139, 0.18)",
    textAlign: "center"
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.3,
    color: "#64748b"
  },
  time: {
    marginTop: 14,
    fontSize: "clamp(48px, 9vw, 86px)",
    fontWeight: 700,
    letterSpacing: 1.5,
    lineHeight: 1.05,
    color: "#111827"
  },
  date: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748b"
  }
};

export default App;
