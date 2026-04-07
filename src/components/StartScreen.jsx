import { useState } from "react";

export default function StartScreen({ onStart, scores }) {
  const [showScores, setShowScores] = useState(false);

  return (
    <div className="screen start-screen">
      <div className="start-bg" aria-hidden="true">
        {["🌍","🏙️","🐾","🌿","🪨"].map((e, i) => (
          <span key={i} className="floating-emoji" style={{ "--i": i }}>{e}</span>
        ))}
      </div>

      <div className="start-content">
        <h1 className="game-title">
          <span className="title-line1">ארץ</span>
          <span className="title-separator">✦</span>
          <span className="title-line2">עיר</span>
        </h1>
        <p className="game-subtitle">חי · צומח · דומם</p>

        <button className="btn-start" onClick={onStart}>
          <span className="btn-start-text">בוא נשחק!</span>
          <span className="btn-start-icon">🚀</span>
        </button>

        {scores.length > 0 && (
          <button
            className="btn-scores"
            onClick={() => setShowScores((v) => !v)}
          >
            {showScores ? "סגור" : "🏆 השיאים שלי"}
          </button>
        )}

        {showScores && scores.length > 0 && (
          <div className="scores-panel">
            <h3>🏆 השיאים שלי</h3>
            <ul>
              {scores.map((s, i) => (
                <li key={s.timestamp} className="score-row">
                  <span className="score-rank">#{i + 1}</span>
                  <span className="score-letter">{s.letter}</span>
                  <span className="score-pts">{s.score} / {s.maxScore}</span>
                  <span className="score-date">{s.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
