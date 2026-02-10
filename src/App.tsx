import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";

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

  const initializeGame = () => {
    const finalCards: CardType[] = cardValues.map((value: string, index: number) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: CardType) => {
    // Don't allow clicking if card is already flipped/matched
    if (card.isFlipped || card.isMatched) return;

    // Update card flipped state
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const firstCard = cards[newFlippedCards[0]];

      if (firstCard.value === card.value) {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id || c.id === firstCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );

          setFlippedCards([]);
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
        }, 1000);
      }
    }
  };

  return (
    <div className="app">
      <GameHeader score={3} moves={10} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
