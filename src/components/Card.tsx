
type CardProps = {
  card: string;
}

export const Card = ({ card }: CardProps) => {
  return (
    <div className="card">
      <div className="card-front">?</div>
      <div className="card-back">{card}</div>
    </div>
  )
}