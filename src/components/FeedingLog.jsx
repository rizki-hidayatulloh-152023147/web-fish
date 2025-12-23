import { useEffect, useState } from "react";
import { getFeedingLog, deleteFeeding } from "../api";

export default function FeedingLog() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 3000); // refresh tiap 3 detik

    return () => clearInterval(interval); // bersihkan saat komponen unmount
  }, []);

  const load = async () => {
    const r = await getFeedingLog();
    setLog(r);
  };

  const remove = async (id) => {
  if (!confirm("Hapus jadwal ini?")) return;
  await deleteFeeding(id);
  load();
  };

  return (
    <div className="box">
      <h2>Feeding Log</h2>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Mode</th>
            <th>Waktu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {log.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.mode}</td>
              <td>{new Date(item.waktu).toLocaleString()}</td>

              <td>
                <button className="btn-danger" onClick={() => remove(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
