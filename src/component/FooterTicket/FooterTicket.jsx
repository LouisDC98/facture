import React from 'react'
import "./FooterTicket.css"

import codeBarre from "../../assets/codeBarre.PNG"

function FooterTicket(props) {
  let { mainInfos, heure } = props

  const randomNumberGenerator = () => {
    let randomNumber = "";
    for (let i = 0; i < 14; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }

    return "99990" + mainInfos.currentProfile?.commandNumber?.slice(0, 7) + randomNumber;
  }

  const formatedDate = () => {
    let elementsDate = mainInfos.currentProfile?.date?.split("/");
    let nouvelleDate;
    if (mainInfos.currentProfile?.date) {
      nouvelleDate = elementsDate[0] + "." + elementsDate[1] + "." + elementsDate[2].substring(2);
    }

    return nouvelleDate
  }

  return (
    <section className='footerTicket'>
      <img src={codeBarre} alt='code barre'></img>
      <p className='wrapperP'>{mainInfos.currentProfile?.commandNumber ? randomNumberGenerator() : <span>0123456789101112131415160</span>}</p>
      <p className='wrapperP indicatif'>{mainInfos.currentProfile.date && mainInfos.currentProfile.commandNumber ?
        formatedDate() + " " + heure + " " + mainInfos.currentProfile.commandNumber.slice(0, 4) + " " + mainInfos.currentProfile.commandNumber.slice(4, 7) + " " + mainInfos.currentProfile.commandNumber.slice(7, 9) + " " + mainInfos.currentProfile.commandNumber.slice(9) :
        <span>01.01.20 00:00 0123 456 78 9100</span>
      }</p>
    </section>
  )
}

export default FooterTicket
