import { useEffect, useState } from "react";

export default function LetterReveal({ letter, onReady }) {
  const [phase, setPhase] = useState("entering"); // entering → showing → ready

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("showing"), 300);
    const t2 = setTimeout(() => setPhase("ready"), 1800);
    const t3 = setTimeout(() => onReady(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onReady]);

  return (
    <div className={`screen reveal-screen phase-${phase}`}>
      <p className="reveal-label">האות היא...</p>
      <div className="letter-burst">
        <div className="letter-glow" />
        <span className="big-letter">{letter}</span>
      </div>
      <p className="reveal-hint">מוכנים? 🎯</p>
    </div>
  );
}
