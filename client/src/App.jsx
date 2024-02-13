import React from "react";
import NodeMapContainer from "./containers/NodeMapContainer.jsx";
import SideBarContainer from "./containers/SideBarContainer.jsx";
import HeaderContainer from "./containers/HeaderContainer.jsx";
import "../styles.scss";

function App() {
  return (
    <div id="AppContainer">
      <SideBarContainer />
      <HeaderContainer />
      <NodeMapContainer />
    </div>
  );
}

export default App;
