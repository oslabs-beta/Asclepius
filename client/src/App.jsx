import React from "react";
import { useSelector } from "react-redux";
import NodeMapContainer from "./containers/NodeMapContainer.jsx";
import HeaderContainer from "./containers/HeaderContainer.jsx";

import "../styles.scss";

function App() {

  return (
    <div id="AppContainer">
      <HeaderContainer />
      <NodeMapContainer/>
    </div>
  );
}

export default App;
