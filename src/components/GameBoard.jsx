import { useRef } from "react";
import { CATEGORIES } from "../data/words";

export default function GameBoard({ letter, answers, onUpdate, onSubmit }) {
  const refs = useRef({});

  function handleKey(e, catId, idx) {
    if (e.key === "Enter") {
      const next = CATEGORIES[idx + 1];
      if (next) refs.current[next.id]?.focus();
      else onSubmit();
    }
  }

  const filled = CATEGORIES.filter((c) => answers[c.id]?.trim()).length;

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <div className="current-letter-badge">{letter}</div>
        <p className="game-instruct">מלא מילה שמתחילה ב־<strong>{letter}</strong></p>
      </div>

      <div className="game-fields">
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.id} className="field-row">
            <label className="field-label">
              <span className="field-emoji">{cat.emoji}</span>
              <span className="field-name">{cat.id}</span>
            </label>
            <input
              ref={(el) => (refs.current[cat.id] = el)}
              className="field-input"
              type="text"
              dir="rtl"
              placeholder={`${cat.id} ב${letter}...`}
              value={answers[cat.id] || ""}
              onChange={(e) => onUpdate(cat.id, e.target.value)}
              onKeyDown={(e) => handleKey(e, cat.id, idx)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
        ))}
      </div>

      <div className="game-footer">
        <div className="progress-dots">
          {CATEGORIES.map((c, i) => (
            <span
              key={c.id}
              className={`dot ${answers[c.id]?.trim() ? "filled" : ""}`}
            />
          ))}
        </div>
        <button
          className="btn-submit"
          onClick={onSubmit}
        >
          {filled === 5 ? "סיימתי! ✅" : `סיימתי (${filled}/5)`}
        </button>
      </div>
    </div>
  );
}
