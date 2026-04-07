import { useState, useCallback } from "react";

const KEY = "eretz-ir-scores";
const MAX_SCORES = 10;

function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function useHighScores() {
  const [scores, setScores] = useState(loadScores);

  const addScore = useCallback((letter, score, maxScore) => {
    const entry = {
      letter,
      score,
      maxScore,
      date: new Date().toLocaleDateString("he-IL"),
      timestamp: Date.now(),
    };
    setScores((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_SCORES);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearScores = useCallback(() => {
    localStorage.removeItem(KEY);
    setScores([]);
  }, []);

  return { scores, addScore, clearScores };
}
