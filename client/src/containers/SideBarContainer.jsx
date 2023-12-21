import React from "react";
import ClusterConnect from "../components/ClusterConnect.jsx";
import AsclepiusLogo from "./AsclepiusLogo.png";

function SideBarContainer() {
  return (
    <div id='SideBarContainer'>
      <img id="asclepius" src={AsclepiusLogo} alt="Asclepius logo" />
      <ClusterConnect />
    </div>
  );
}

export default SideBarContainer;