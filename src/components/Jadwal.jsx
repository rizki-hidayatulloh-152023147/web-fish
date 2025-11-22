import { useEffect, useState } from "react";
import { 
  getJadwal, 
  addJadwal, 
  updateJadwal, 
  deleteJadwal 
} from "../api";

export default function Jadwal() {
  const [jadwal, setJadwal] = useState([]);
  const [jam, setJam] = useState("");
  const [editId, setEditId] = useState(null);
  const [editJam, setEditJam] = useState("");
  const [editAktif, setEditAktif] = useState(1);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getJadwal();
    setJadwal(data);
  };

  const submit = async () => {
    if (!jam) return alert("Masukkan jam!");

    await addJadwal(jam);
    setJam("");
    load();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditJam(item.jam);
    setEditAktif(item.aktif);
  };

  const saveEdit = async () => {
    await updateJadwal(editId, editJam, editAktif);
    setEditId(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Hapus jadwal ini?")) return;
    await deleteJadwal(id);
    load();
  };

  return (
    <div className="card">
      <h2>Jadwal Pakan</h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="time"
          value={jam}
          onChange={e => setJam(e.target.value)}
          style={{ marginBottom: 0 }}
        />

        <button className="btn" onClick={submit}>
          Tambah Jadwal
        </button>
      </div>

      <ul>
        {jadwal.map(j => (
          <li key={j.id}>

            {editId === j.id ? (
              <>
                <div>
                  <input
                    type="time"
                    value={editJam}
                    onChange={e => setEditJam(e.target.value)}
                  />

                  <select
                    value={editAktif}
                    onChange={e => setEditAktif(Number(e.target.value))}
                  >
                    <option value={1}>Aktif</option>
                    <option value={0}>Nonaktif</option>
                  </select>
                </div>

                <button className="btn" onClick={saveEdit}>
                  Save
                </button>

                <button className="btn-danger" onClick={() => setEditId(null)}>
                  Batal
                </button>
              </>
            ) : (
              <>
                <span>{j.jam} - {j.aktif ? "Aktif" : "Nonaktif"}</span>

                <button className="btn" onClick={() => startEdit(j)}>
                  Edit
                </button>

                <button className="btn-danger" onClick={() => remove(j.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}