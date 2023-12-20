import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/nodeSlice.js";
import { kubectlSet } from "../../redux/slices/userSlice.js";
import { dontShowPrompt } from "../../redux/slices/userSlice.js";
import { cloudInfo } from "../../redux/slices/userSlice.js";
import { localInfo } from "../../redux/slices/userSlice.js";
import { aksForm } from "../../redux/slices/userSlice.js";

function ConnectCluster() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.dontShowPrompt);
  console.log("dont show prompt", dontShowPrompt);
  const cloud = useSelector((state) => state.user.cloudInfo);
  const local = useSelector((state) => state.user.localInfo);
  const aks = useSelector((state) => state.user.aksForm);
  const getData = () => {
    fetch(`http://localhost:3000/getData`)
      .then((data) => data.json())
      .then((data) => {
        console.log("this is the data I need: ", data);
        if (data === false) {
          dispatch(kubectlSet());
        } else if (data.clusterName === "") {
          dispatch(dontShowPrompt());
        } else dispatch(setData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AKSfetch = () => {
    fetch("http://localhost:3000/azlogin").then((response) => {
      if (response.status === 200) {
        console.log("we did it!!!!");
        dispatch(aksForm());
      }
    });
  };

  return (
    <div>
      {show ? null : (
        <span>
          <button
            onClick={() => {
              dispatch(cloudInfo());
              dispatch(dontShowPrompt());
            }}
          >
            Connect to Cloud Cluster
          </button>
          <button
            onClick={() => {
              dispatch(localInfo());
              dispatch(dontShowPrompt());
            }}
          >
            Connect to Local Cluster
          </button>
        </span>
      )}
      {cloud ? (
        <div>
          <button
            onClick={() => {
              dispatch(cloudInfo());
              AKSfetch();
            }}
          >
            Connect to AKS-hosted Cluster
          </button>
        </div>
      ) : null}
      {local ? (
        <div>
          <h1>
            Connection to local cluster failed. Please make sure your kubectl
            config file is in place.
          </h1>
        </div>
      ) : null}
      {aks ? <div>FORM</div> : null}
      <button onClick={() => getData()}>Render Node Map</button>
    </div>
  );
}

export default ConnectCluster;
