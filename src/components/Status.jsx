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

  const normalizedStatus = status?.toString().trim().toUpperCase();

  return (
    <>
      <span className="status-label">ESP32:</span>
      <span
        className={`status-value ${
          normalizedStatus === "ONLINE"
            ? "online"
            : normalizedStatus === "OFFLINE"
            ? "offline"
            : ""
        }`}
      >
        {status}
      </span>
    </>
  );
}
