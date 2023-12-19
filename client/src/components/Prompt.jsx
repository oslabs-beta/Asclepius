import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ConnectCluster from "./prompt/ConnnectCluster.jsx";
import Kubectl from "./prompt/Kubectl.jsx";

function Prompt() {
  const kubectl = useSelector((state) => {
    return state.user.kubectl;
  });
  console.log("this is kubectl on prompt", kubectl);
  //prompt with connect cluster button

  //kubectl install info (will have a button to reset kubectl to true)
  //getData button will send us to getData route

  return <div>{kubectl ? <ConnectCluster /> : <Kubectl />}</div>;
}

export default Prompt;
