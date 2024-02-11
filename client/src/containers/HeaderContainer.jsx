import React from "react";

function HeaderContainer() {
  return (
    <div id="HeaderContainer">
      <button id="map" className="renderButton">
        Node Map
      </button>
      <button id="charts" className="renderButton">
        Live Chart
      </button>
      <button id="cost" className="renderButton">
        Cost Estimate
      </button>
    </div>
  );
}

export default HeaderContainer;
