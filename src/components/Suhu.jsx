import { useEffect, useState } from "react";
import { getMonitoring } from "../api";

export default function Suhu() {
  const [suhu, setSuhu] = useState("-");

  useEffect(() => {
    load();
    const i = setInterval(load, 3000);

    return () => clearInterval(i);
  }, []);

  const load = async () => {
    const data = await getMonitoring();
    setSuhu(data.suhu);
  };

  return (
    <div className="card">
      <h2>Suhu Air</h2>
      <p>{suhu} °C</p>
    </div>
  );
}
