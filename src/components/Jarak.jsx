import { useEffect, useState } from "react";
import { getMonitoring } from "../api";

export default function Jarak() {
  const [jarak, setJarak] = useState("-");

  useEffect(() => {
    load();
    const i = setInterval(load, 3000);

    return () => clearInterval(i);
  }, []);

  const load = async () => {
    const data = await getMonitoring();
    setJarak(data.jarak);
  };

  // Fungsi untuk menentukan status berdasarkan jarak
  const getStatus = () => {
    if (jarak === "-") return { label: "Loading...", color: "#94a3b8", percentage: 0 };
    
    const distance = parseFloat(jarak);
    
    // Asumsi: jarak kecil = pakan penuh, jarak besar = pakan kosong
    // Sesuaikan threshold ini dengan kondisi wadah pakan Anda
    if (distance <= 5) {
      return { label: "Penuh", color: "#22c55e", percentage: 100 };
    } else if (distance <= 10) {
      return { label: "Banyak", color: "#3b82f6", percentage: 75 };
    } else if (distance <= 15) {
      return { label: "Setengah", color: "#f59e0b", percentage: 50 };
    } else if (distance <= 20) {
      return { label: "Sedikit", color: "#ef4444", percentage: 25 };
    } else {
      return { label: "Kosong", color: "#dc2626", percentage: 0 };
    }
  };

  const status = getStatus();

  return (
    <div className="card">
      <h2>Level Pakan</h2>
      <p style={{ marginBottom: '10px' }}>{jarak}cm</p>
      
      {/* Status Label */}
      <div style={{ 
        textAlign: 'center', 
        fontSize: '0.95rem', 
        fontWeight: '600',
        color: status.color,
        marginBottom: '12px'
      }}>
        {status.label}
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '12px',
        background: 'rgba(15, 23, 42, 0.7)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(148, 163, 184, 0.2)'
      }}>
        <div style={{
          width: `${status.percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${status.color}, ${status.color}dd)`,
          transition: 'width 0.5s ease',
          borderRadius: '10px'
        }}></div>
      </div>

      {/* Percentage */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#94a3b8',
        marginTop: '8px'
      }}>
        {status.percentage}%
      </div>
    </div>
  );
}