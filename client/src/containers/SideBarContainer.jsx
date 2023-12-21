import React from "react";
import AsclepiusLogo from "./AsclepiusLogo.png";

function SideBarContainer() {
  return (
    <div id='SideBarContainer'>
     
      <div id="logocontainer">
      <img id="asclepiusLogo" src={AsclepiusLogo} alt="Asclepius logo" />
      </div>
    </div>
  );
}

export default SideBarContainer;