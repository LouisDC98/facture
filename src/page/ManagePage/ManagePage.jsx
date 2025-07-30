import { useState } from 'react'
import './ManagePage.css'
import { NavLink } from 'react-router-dom';

import NavBar from "../../component/NavBar/NavBar.jsx"
import DashboardArticle from '../../component/DashboardArticle/DashboardArticle.jsx';
import DashboardProfil from '../../component/DashboardProfil/DashboardProfil.jsx';
import DashboardStore from '../../component/DashboardStore/DashboardStore.jsx';
import DashboardGeneral from '../../component/DashboardGeneral/DashboardGeneral.jsx';
import DashboardPicture from '../../component/DashboardPicture/DashboardPicture.jsx';
import DashboardFacture from '../../component/DashboardFacture/DashboardFacture.jsx';

function ManagePage() {
  const [type, setType] = useState("dashboard")
  const [displayNavBar, setDisplayNavBar] = useState(true)

  const headerTitles = {
    random: "Articles randoms",
    essential: "Articles essentiels",
    profile: "Profils",
    store: "Magasins",
    picture: "Photo",
    bill: "Facture",
  };

  const currentHeaderTitle = headerTitles[type] || "Dashboard";

  const renderDashboardContent = (type) => {
    if (type === "random" || type === "essential") {
      return <DashboardArticle type={type} />;
    }

    if (type === "profile") {
      return <DashboardProfil />;
    }

    if (type === "store") {
      return <DashboardStore />;
    }

    if (type === "dashboard") {
      return <DashboardGeneral />;
    }

    if (type === "picture") {
      return <DashboardPicture />;
    }

    if (type === "bill") {
      return <DashboardFacture />;
    }

    return null;
  };

  return (
    <div className="managePage">
      <div className={`navBarDisplay ${!displayNavBar && 'closed'}`} >
        <NavBar type={type} setType={(newType) => setType(newType)} />
      </div>
      <div className="dashboardDisplay">
        <div className='headerManage'>
          <button onClick={() => setDisplayNavBar(!displayNavBar)} className='burgerBtn'></button>
          <div className='headerTitle'>{currentHeaderTitle}</div>
          <NavLink to="/facture" className="primaryBtn navLink">Créer une facture</NavLink>
        </div>
        <div className='scrollAllow' >
          {renderDashboardContent(type)}
        </div>
      </div>
    </div>
  )
}

export default ManagePage