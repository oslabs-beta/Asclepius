import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/slices/userSlice";
import AsclepiusLogo from "./AsclepiusLogo.png";


function HeaderContainer() {
  const dispatch = useDispatch();
  return (
    <div id="HeaderContainer">
      <div id="logocontainer">
        <img id="asclepiusLogo" src={AsclepiusLogo} alt="Asclepius logo" />
        <div id="asclepiusText">Asclepius</div>
      </div>
      <button
        onClick={() => dispatch(setPage("map"))}
        id="map"
        className="renderButton"
      >
        Node Map
      </button>
      <button
        id="charts"
        className="renderButton"
        onClick={() => dispatch(setPage("charts"))}
      >
        Live Chart
      </button>
      <button
        id="cost"
        className="renderButton"
        onClick={() => dispatch(setPage("cost"))}
      >
        Cost Estimate
      </button>
    </div>
  );
}

export default HeaderContainer;
