import { useEffect, useState } from 'react'
import './ManagePage.css'

import NavBar from "../../component/NavBar/NavBar.jsx"
import Dashboard from '../../component/Dashboard/Dashboard.jsx';

function ManagePage() {
  const [type, setType] = useState(undefined)

  return (
    <div className="managePage">
      <div className="navBarDisplay">
        <NavBar type={type} setType={(newType) => setType(newType)} />
      </div>
      <div className="dashboardDisplay">


        <Dashboard type={type} />

      </div>
    </div>
  )
}

export default ManagePage