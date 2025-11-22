import Status from "./Status";
import Suhu from "./Suhu";
import Feeding from "./Feeding";
import Jadwal from "./Jadwal";
import FeedingLog from "./FeedingLog";
import Jarak from "./Jarak";

export default function Dashboard() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Fish Feeder Dashboard</h1>
          <div className="status-indicator">
            <Status />
          </div>
        </div>
      </nav>
      
      <div className="container">
        <div className="monitoring-row">
          <Jarak />
          <Suhu />
          <Feeding />
        </div>
        
        <Jadwal />
        
        <FeedingLog />
      </div>
    </div>
  );
}