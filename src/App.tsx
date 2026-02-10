import { useEffect, useState } from "react"
import { Card } from "./components/Card"
import { GameHeader } from "./components/GameHeader"

const cardValues = [
  "🤨",
  "😄",
  "😍",
  "🤣",
  "🤐",
  "🤑",
  "😴",
  "🤯",
  "🤨",
  "😄",
  "😍",
  "🤣",
  "🤐",
  "🤑",
  "😴",
  "🤯"
]

function App() {

  type CardType = {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  };

  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState([])

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
  }

  return (
    <div className="app">
      <GameHeader score={3} moves={10} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

export default App
