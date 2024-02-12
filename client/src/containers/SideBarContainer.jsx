import React from "react";
import AsclepiusLogo from "./AsclepiusLogo.png";
import { useSelector } from "react-redux";
import Sidebarsection from "../components/Sidebarsection.jsx";

function SideBarContainer() {
  const sidebarDatabool = useSelector(
    (state) => Object.keys(state.node.sidebarData).length > 0
  );
  return (
    <div id="SideBarContainer">
      <div id="logocontainer">
        <img id="asclepiusLogo" src={AsclepiusLogo} alt="Asclepius logo" />
        <div id="asclepiusText">Asclepius</div>
      </div>
      <div id="sideBar">{sidebarDatabool ? <Sidebarsection /> : null}</div>
    </div>
  );
}

export default SideBarContainer;
