import React from "react";
import { useSelector } from "react-redux";
import NodeMapContainer from "./containers/NodeMapContainer.jsx";
import SideBarContainer from "./containers/SideBarContainer.jsx";
import HeaderContainer from "./containers/HeaderContainer.jsx";
import NewMap from "./components/NewMap.jsx";
import "../styles.scss";

function App() {
  const page = useSelector((state) => state.user.page);
  return (
    <div id="AppContainer">
      <SideBarContainer />
      <HeaderContainer />
      {page === "map" ? <NodeMapContainer /> : null}
      {page === "charts" ? <NewMap id="newMap" /> : null}
      {page === "cost" ? <div>cost</div> : null}
    </div>
  );
}

export default App;
