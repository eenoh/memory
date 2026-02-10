import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";
import { Win } from "./components/Win";

const cardValues = [
  "🤨", "😄", "😍", "🤣", "🤐", "🤑", "😴", "🤯",
  "🤨", "😄", "😍", "🤣", "🤐", "🤑", "😴", "🤯",
];

function App() {
  type CardType = {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  };

  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    // Shuffle the cards
    const shuffled = shuffleArray(cardValues);

    const finalCards: CardType[] = cardValues.map((value: string, index: number) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);

    setMoves(0);
    setScore(0);

    setMatchedCards([]);
    setFlippedCards([]);

    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: CardType) => {
    // Don't allow clicking if card is already flipped/matched
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) return;

    // Update card flipped state
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      const firstCard = cards[newFlippedCards[0]];

      if (firstCard.value === card.value) {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        setScore((prev) => prev + 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id || c.id === firstCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );

          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // Flip back the cards if there is no match
        const flippedBackCards = newCards.map((c) =>
          newFlippedCards.includes(c.id)
            ? { ...c, isFlipped: false }
            : c
        );

        setTimeout(() => {
          setCards(flippedBackCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };

  const RESTART_DELAY = 3000;

  useEffect(() => {
    // Restart game automatically when all pairs are found
    if (matchedCards.length === cardValues.length && cardValues.length > 0) {
      setTimeout(() => {
        initializeGame();
        setIsLocked(false);
      }, RESTART_DELAY);
    }
  }, [matchedCards]);

  const isGameComplete = matchedCards.length === cardValues.length;

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
