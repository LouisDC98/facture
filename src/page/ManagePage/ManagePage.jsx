import { useEffect, useState } from 'react'
import './ManagePage.css'

import NavBar from "../../component/NavBar/NavBar.jsx"
import DashboardArticle from '../../component/DashboardArticle/DashboardArticle.jsx';
import DashboardProfil from '../../component/DashboardProfil/DashboardProfil.jsx';
import DashboardStore from '../../component/DashboardStore/DashboardStore.jsx';

function ManagePage() {
  const [type, setType] = useState("essential")

  return (
    <div className="managePage">
      <div className="navBarDisplay">
        <NavBar type={type} setType={(newType) => setType(newType)} />
      </div>
      <div className="dashboardDisplay">

        {(type === "random" || type === "essential") &&
          <DashboardArticle type={type} />
        }
        {type === "profile" &&
          <DashboardProfil />
        }

        {type === "store" &&
          <DashboardStore />
        }

      </div>
    </div>
  )
}

export default ManagePage