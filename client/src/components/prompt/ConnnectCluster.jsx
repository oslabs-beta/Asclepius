import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/nodeSlice.js";
import {
  kubectlSet,
  showPrompt,
  cloudInfo,
  localInfo,
  aksForm,
  aksInput,
} from "../../redux/slices/userSlice.js";

function ConnectCluster() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.showPrompt);

  //Booleans from state to conditionally render elements in the return statement
  const cloud = useSelector((state) => state.user.cloudInfo);
  const local = useSelector((state) => state.user.localInfo);
  const aks = useSelector((state) => state.user.aksForm);
  const aksInfo = useSelector((state) => state.user.aksInfo.clusterName);

  const getData = () => {
    fetch(`http://localhost:3000/getData`)
      .then((data) => data.json())
      .then((data) => {
        console.log("this is the data I need: ", data);
        if (data === false) {
          dispatch(kubectlSet());
        } else if (data.clusterName === "") {
          dispatch(showPrompt());
        } else {
          console.log("correctly sending back data");
          dispatch(setData(data));
        }
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

  //Handles submitting of aks info form
  const aksSubmit = (e) => {
    e.preventDefault();
    const data = {
      clusterName: e.target.elements.clusterName.value,
      resourceGroup: e.target.elements.resourceGroup.value,
    };
    console.log("this is form submit data:", data);
    fetch("http://localhost:3000/azlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response === "success") {
        }
      });
    dispatch(aksInput(data));
  };

  return (
    <div>
      {show ? (
        <span>
          <button
            onClick={() => {
              dispatch(cloudInfo());
              dispatch(showPrompt());
            }}
          >
            Connect to Cloud Cluster
          </button>
          <button
            onClick={() => {
              dispatch(localInfo());
              dispatch(showPrompt());
            }}
          >
            Connect to Local Cluster
          </button>
        </span>
      ) : null}
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
      {aks ? (
        <div>
          <form onSubmit={aksSubmit}>
            <label>Cluster Name:</label>
            <input type="text" name="clusterName" />
            <label>Resource Group Name:</label>
            <input type="text" name="resourceGroup" />
            <button type="submit">Save Cluster Info</button>
            <hr />
          </form>
          {aksInfo !== "" ? (
            <div>
              Successfully added a Kube config file, please try to Render Node
              Map!
            </div>
          ) : null}
        </div>
      ) : null}
      <button onClick={() => getData()}>Render Node Map</button>
    </div>
  );
}


export default ConnectCluster;
