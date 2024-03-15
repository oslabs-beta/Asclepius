import React, { useState } from "react";
import Sidebarsection from "../components/Sidebarsection.jsx";
import arrow from "../assets/arrow.png"

function SideBarContainer() {

  const handleToggle = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('active')
  }
  //id="SideBarContainer"
  return (
    <div  className="sidebar">
      <Sidebarsection />
      <div className="arrow" onClick={handleToggle}><img id="img" src={arrow}></img></div>
    </div>
  );
}

export default SideBarContainer;
