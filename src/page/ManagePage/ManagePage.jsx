import { useEffect, useState } from 'react'
import './ManagePage.css'

import NavBar from "../../component/NavBar/NavBar.jsx"
import Dashboard from '../../component/Dashboard/Dashboard.jsx';
import DashboardProfil from '../../component/DashboardProfil/DashboardProfil.jsx';

function ManagePage() {
  const [type, setType] = useState("essential")

  return (
    <div className="managePage">
      <div className="navBarDisplay">
        <NavBar type={type} setType={(newType) => setType(newType)} />
      </div>
      <div className="dashboardDisplay">

        {(type === "random" || type === "essential") &&
          <Dashboard type={type} />
        }
        {type === "profile" &&
          <DashboardProfil />
        }

      </div>
    </div>
  )
}

export default ManagePage