import { useEffect, useState } from "react";
import { getFeedingLog, deleteFeeding } from "../api";

export default function FeedingLog() {
  const [log, setLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 3000);

    return () => clearInterval(interval);
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

  const totalPages = Math.ceil(log.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = log.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{indexOfFirstItem + index + 1}</td>
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

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          style={{ padding: "8px 16px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        >
          Previous
        </button>
        
        <span>
          Halaman {currentPage} dari {totalPages || 1}
        </span>
        
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages || totalPages === 0}
          style={{ padding: "8px 16px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}