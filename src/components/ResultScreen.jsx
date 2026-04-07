import { useEffect, useRef } from "react";
import { CATEGORIES } from "../data/words";

const STATUS_META = {
  known:        { icon: "✅", color: "#22c55e" },
  unknown:      { icon: "❓", color: "#f59e0b" },
  wrong_letter: { icon: "❌", color: "#ef4444" },
  empty:        { icon: "⬜", color: "#64748b" },
};

function Confetti({ canvas }) {
  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      r: 4 + Math.random() * 8,
      color: ["#fbbf24","#06b6d4","#f472b6","#a3e635","#f87171"][Math.floor(Math.random()*5)],
      speed: 2 + Math.random() * 4,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 5,
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 2);
        ctx.restore();
        p.y += p.speed;
        p.angle += p.spin;
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const stop = setTimeout(() => cancelAnimationFrame(raf), 3500);
    return () => { cancelAnimationFrame(raf); clearTimeout(stop); };
  }, [canvas]);

  return null;
}

export default function ResultScreen({ letter, results, score, onPlayAgain, onHome }) {
  const canvasRef = useRef(null);
  const maxScore = CATEGORIES.length * 10;
  const pct = Math.round((score / maxScore) * 100);
  const isGreat = score >= maxScore * 0.7;

  return (
    <div className="screen result-screen">
      {isGreat && <canvas ref={canvasRef} className="confetti-canvas" />}
      {isGreat && canvasRef.current && <Confetti canvas={canvasRef.current} />}

      <div className="result-header">
        <div className="result-letter">{letter}</div>
        <div className="result-score-wrap">
          <span className="result-score">{score}</span>
          <span className="result-max">/ {maxScore}</span>
        </div>
        <p className="result-msg">
          {pct === 100 ? "מושלם! 🌟🌟🌟" :
           pct >= 70  ? "כל הכבוד! 🎉" :
           pct >= 40  ? "יפה! נסה שוב 💪" :
                        "לא נורא, תתאמן 🙂"}
        </p>
      </div>

      <ul className="result-list">
        {CATEGORIES.map((cat, i) => {
          const r = results[cat.id];
          const meta = STATUS_META[r.status];
          return (
            <li
              key={cat.id}
              className="result-item"
              style={{ "--delay": `${i * 0.12}s`, "--color": meta.color }}
            >
              <span className="ri-emoji">{cat.emoji}</span>
              <div className="ri-text">
                <span className="ri-cat">{cat.id}</span>
                <span className="ri-msg">
                  {r.status === "known" && `${r.answer} — נכון! יופי!`}
                  {r.status === "unknown" && `${r.answer} — לא הכרנו, אבל ייתכן שנכון! +5`}
                  {r.status === "wrong_letter" && `${r.answer} — לא מתחיל ב${letter}...`}
                  {r.status === "empty" && "לא מילאת — אין ניקוד"}
                </span>
                {r.suggestion && (
                  <span className="ri-suggestion">💡 למשל: <strong>{r.suggestion}</strong></span>
                )}
              </div>
              <span className="ri-icon">{meta.icon}</span>
              <span className="ri-pts">+{r.points}</span>
            </li>
          );
        })}
      </ul>

      <div className="result-actions">
        <button className="btn-again" onClick={onPlayAgain}>שוב! 🎲</button>
        <button className="btn-home" onClick={onHome}>בית 🏠</button>
      </div>
    </div>
  );
}
