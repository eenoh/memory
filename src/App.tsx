import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";
import { Win } from "./components/Win";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const {
    cards,
    score,
    moves,
    isGameComplete,
    initializeGame,
    handleCardClick,
    RESTART_DELAY,
  } = useGameLogic();

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <Win moves={moves} duration={RESTART_DELAY} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
