import { useEffect, useState } from "react";

type WinProps = {
  moves: number;
  duration: number;
};

export const Win = ({ moves, duration }: WinProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(0);

    const start = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);

      if (next >= 100) {
        window.clearInterval(interval);
      }
    }, 30);

    return () => window.clearInterval(interval);
  }, [duration]);

  return (
    <div className="win-message">
      <h2>Congratulations!</h2>
      <p>You completed the game in {moves} moves!</p>

      <div className="restart-progress" aria-label="Restarting game">
        <div
          className="restart-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="restart-text">Starting a new game...</p>
    </div>
  );
};
