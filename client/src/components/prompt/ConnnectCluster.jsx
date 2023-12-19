import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/nodeSlice.js";
import { kubectlSet } from "../../redux/slices/userSlice.js";
import { dontShowPrompt } from "../../redux/slices/userSlice.js";

function ConnectCluster() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.dontShowPrompt);
  console.log("dont show prompt", dontShowPrompt);
  let cloudInfo = false;
  let localInfo = false;
  let aksForm = false;

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
      if (response === "success") {
        aksForm = true;
        console.log("aksForm result:", aksForm);
      }
    });
  };

  return (
    <div>
      {show ? null : (
        <span>
          <button
            onClick={() => {
              cloudInfo = true;
            }}
          >
            Connect to Cloud Cluster
          </button>
          <button
            onClick={() => {
              localInfo = true;
            }}
          >
            Connect to Local Cluster
          </button>
        </span>
      )}
      {cloudInfo ? (
        <div>
          <button
            onClick={() => {
              cloudInfo = false;
              AKSfetch();
            }}
          >
            Connect to AKS-hosted Cluster
          </button>
        </div>
      ) : null}
      {localInfo ? (
        <div>
          <h1>
            Connection to local cluster failed. Please make sure your kubectl
            config file is in place.
          </h1>
        </div>
      ) : null}
      {aksForm ? <div>FORM</div> : null}
      <button onClick={() => getData()}>Render Node Map</button>
    </div>
  );
}

export default ConnectCluster;
