import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import kubectlSet from "../../redux/slices/userSlice.js";

function Kubectl() {
  const dispatch = useDispatch();
  //prompt with connect cluster button

  //kubectl install info (will have a button to reset kubectl to true)
  //getData button will send us to getData route

  return (
    <div>
      <h1>
        It seems like you don't have kubectl installed. Please install kubectl
        and try again.
      </h1>
      <button onClick={() => dispatch(kubectlSet)}>
        I've installed kubectl- Reconnect Cluster
      </button>
    </div>
  );
}

export default Kubectl;
