import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ConnectCluster from "./prompt/ConnnectCluster.jsx";
import KubectlInst from "./prompt/KubectlInst.jsx";

function Prompt() {
  const kubectl = useSelector((state) => {
    return state.user.kubectl;
  });
  //prompt with connect cluster button

  //kubectl install info (will have a button to reset kubectl to true)
  //getData button will send us to getData route

  return <div>{kubectl ? <ConnectCluster /> : <KubectlInst />}</div>;
}

export default Prompt;
