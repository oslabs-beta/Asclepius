import React from "react";
import NodeMap from "../components/NodeMap.jsx";
import Prompt from "../components/Prompt.jsx";
import { useSelector } from "react-redux";
import NodeMapHeader from "../components/NodeMapHeader.jsx";

function NodeMapContainer() {
  //useSelector to listen for boolean state (do we have data?)
  const stateData = useSelector((state) => {
    return state.node.clusterName;
  });
  console.log(stateData);

  return (
    <div id="NodeMapContainer">
      {stateData === "" ? (
        <Prompt />
      ) : (
        <>
          {/* <NodeMapHeader /> */}
          <NodeMap />
        </>
      )}
    </div>
  );
}

export default NodeMapContainer;
