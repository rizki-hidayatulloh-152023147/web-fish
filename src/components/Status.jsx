import { useEffect, useState } from "react";
import { getStatus } from "../api";

export default function Status() {
  const [status, setStatus] = useState("LOADING...");

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000);

    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    const data = await getStatus();
    setStatus(data.status);
  };

  return (
    <>
      <span className="status-label">ESP32:</span>
      <span className={`status-value ${status === 'ONLINE' ? 'online' : 'offline'}`}>
        {status}
      </span>
    </>
  );
}