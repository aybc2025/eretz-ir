import { useGame, SCREENS } from "./hooks/useGame";
import { useHighScores } from "./hooks/useHighScores";
import StartScreen from "./components/StartScreen";
import LetterReveal from "./components/LetterReveal";
import GameBoard from "./components/GameBoard";
import ResultScreen from "./components/ResultScreen";
import { CATEGORIES } from "./data/words";
import { useEffect } from "react";

export default function App() {
  const {
    screen, letter, answers, results, score,
    startGame, beginPlaying, updateAnswer, submitAnswers, goHome,
  } = useGame();

  const { scores, addScore } = useHighScores();

  // שמור ניקוד כשמגיעים לתוצאות
  useEffect(() => {
    if (screen === SCREENS.RESULT && results) {
      addScore(letter, score, CATEGORIES.length * 10);
    }
  }, [screen]); // eslint-disable-line

  return (
    <div className="app-root">
      {screen === SCREENS.START && (
        <StartScreen onStart={startGame} scores={scores} />
      )}
      {screen === SCREENS.REVEAL && (
        <LetterReveal letter={letter} onReady={beginPlaying} />
      )}
      {screen === SCREENS.PLAY && (
        <GameBoard
          letter={letter}
          answers={answers}
          onUpdate={updateAnswer}
          onSubmit={submitAnswers}
        />
      )}
      {screen === SCREENS.RESULT && (
        <ResultScreen
          letter={letter}
          results={results}
          score={score}
          onPlayAgain={startGame}
          onHome={goHome}
        />
      )}
    </div>
  );
}
