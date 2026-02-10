
type CardProps = {
  card: CardType;
  onClick: (card: CardType) => void;
}

type CardType = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const Card = ({ card, onClick }: CardProps) => {
  return (
    <div className={`card ${card.isFlipped ? "flipped" : ""}`} onClick={() => onClick(card)}>
      <div className="card-front">?</div>
      <div className="card-back">{card.value}</div>
    </div>
  )
}