import './ManagePage.css'

import NavBar from "../../component/NavBar/NavBar.jsx"
import Dashboard from '../../component/Dashboard/Dashboard.jsx';

function ManagePage() {

  return (
    <div className="managePage">
      <div className="navBarDisplay">
        <NavBar />
      </div>
      <div className="dashboardDisplay">
        <Dashboard />
      </div>
    </div>
  )
}

export default ManagePage