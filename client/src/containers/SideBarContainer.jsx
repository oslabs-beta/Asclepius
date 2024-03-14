import React, { useState } from "react";
import Sidebarsection from "../components/Sidebarsection.jsx";
import arrow from "../assets/arrow.png"

function SideBarContainer() {
  const [isHidden, setHidden] = useState("sidebar--hidden")

  const handleToggle = () => {
    if (isHidden === "sidebar") {
      setHidden("sidebar--hidden")
    } else setHidden("sidebar")
  }
  //id="SideBarContainer"
  return (
    <div  className={isHidden}>
      <Sidebarsection />
      <div className="arrow" onClick={() => handleToggle()}><img id="img" src={arrow}></img></div>
    </div>
  );
}

export default SideBarContainer;
