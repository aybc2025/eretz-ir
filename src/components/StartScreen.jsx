import { useState } from "react";
import { LETTERS } from "../data/words";

export default function StartScreen({ onStart, scores }) {
  const [showScores, setShowScores] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

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

        {/* כפתורים ראשיים */}
        <div className="start-buttons">
          <button className="btn-start" onClick={() => onStart(null)}>
            <span className="btn-start-text">הגרל אות!</span>
            <span className="btn-start-icon">🎲</span>
          </button>

          <button
            className="btn-pick"
            onClick={() => { setShowPicker((v) => !v); setShowScores(false); }}
          >
            <span>בחר אות</span>
            <span>🔤</span>
          </button>
        </div>

        {/* גריד בחירת אות */}
        {showPicker && (
          <div className="letter-picker">
            <p className="picker-label">באיזה אות תשחק?</p>
            <div className="picker-grid">
              {LETTERS.map((l) => (
                <button
                  key={l}
                  className="picker-letter"
                  onClick={() => { setShowPicker(false); onStart(l); }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* שיאים */}
        {scores.length > 0 && (
          <button
            className="btn-scores"
            onClick={() => { setShowScores((v) => !v); setShowPicker(false); }}
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