import React from "react";
import NodeMap from "../components/NodeMap.jsx";
import Prompt from "../components/Prompt.jsx";
import { useSelector } from "react-redux";
import SideBarContainer from "./SideBarContainer.jsx";
import Chart from "../components/Chart.jsx";
import Cost from "../components/Cost.jsx"


function NodeMapContainer() {
  //useSelector to listen for boolean state (do we have data?)
  const stateData = useSelector((state) => {
    return state.node.clusterName;
  });
  console.log(stateData);
  const page = useSelector((state) => state.user.page);


  return (
    <div id="NodeMapContainer">
      {stateData === "" ? (
        <Prompt />
      ) : (
        <div id="content">
        <SideBarContainer />
        {page === "map" ? <NodeMap /> : null}
        {page === "charts" ? <Chart /> : null}
        {page === "cost" ? <Cost /> : null}
        </div>
      )}
    </div>
  );
}

export default NodeMapContainer;
