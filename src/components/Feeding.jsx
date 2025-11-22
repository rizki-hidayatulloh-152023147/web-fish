import { useState } from "react";
import { feedManual } from "../api";

export default function Feeding() {
  const [loading, setLoading] = useState(false);

  const handleFeed = async () => {
    setLoading(true);
    await feedManual();
    setLoading(false);
    alert("Pakan dikirim! Servo bergerak.");
  };

  return (
    <div className="card">
      <h2>Pakan Manual</h2>

      <button
        className="btn"
        onClick={handleFeed}
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? "Memberikan Pakan..." : "Beri Pakan Sekarang"}
      </button>
    </div>
  );
}