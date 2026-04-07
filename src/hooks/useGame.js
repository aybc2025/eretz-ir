import { useState, useCallback } from "react";
import { LETTERS, CATEGORIES, checkAnswer } from "../data/words";

export const SCREENS = {
  START: "start",
  REVEAL: "reveal",
  PLAY: "play",
  RESULT: "result",
};

const POINTS = {
  KNOWN: 10,
  UNKNOWN: 5,
  EMPTY: 0,
  WRONG_LETTER: 0,
};

function getRandomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

export function useGame() {
  const [screen, setScreen] = useState(SCREENS.START);
  const [letter, setLetter] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    const newLetter = getRandomLetter();
    setLetter(newLetter);
    setAnswers({});
    setResults(null);
    setScore(0);
    setScreen(SCREENS.REVEAL);
  }, []);

  const beginPlaying = useCallback(() => {
    setScreen(SCREENS.PLAY);
  }, []);

  const updateAnswer = useCallback((categoryId, value) => {
    setAnswers((prev) => ({ ...prev, [categoryId]: value }));
  }, []);

  const submitAnswers = useCallback(() => {
    const newResults = {};
    let totalScore = 0;

    for (const cat of CATEGORIES) {
      const answer = answers[cat.id] || "";
      const check = checkAnswer(letter, cat.id, answer);

      let points = POINTS.EMPTY;
      let status = "empty";

      if (answer.trim() !== "") {
        if (!check.valid) {
          status = "wrong_letter";
          points = POINTS.WRONG_LETTER;
        } else if (check.known) {
          status = "known";
          points = POINTS.KNOWN;
        } else {
          status = "unknown";
          points = POINTS.UNKNOWN;
        }
      }

      newResults[cat.id] = {
        answer: answer.trim(),
        status,
        points,
        canonical: check.canonical,
      };
      totalScore += points;
    }

    setResults(newResults);
    setScore(totalScore);
    setScreen(SCREENS.RESULT);
  }, [answers, letter]);

  const goHome = useCallback(() => {
    setScreen(SCREENS.START);
  }, []);

  return {
    screen,
    letter,
    answers,
    results,
    score,
    startGame,
    beginPlaying,
    updateAnswer,
    submitAnswers,
    goHome,
  };
}
