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
  aksCLIInfo,
} from "../../redux/slices/userSlice.js";
import LocalInst from "./LocalInst.jsx"
import AzCLIInst from "./AzCLIInst.jsx"

function ConnectCluster() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.showPrompt);

  //Booleans from state to conditionally render elements in the return statement
  const cloud = useSelector((state) => state.user.cloudInfo);
  const local = useSelector((state) => state.user.localInfo);
  const aks = useSelector((state) => state.user.aksForm);
  const aksInfo = useSelector((state) => state.user.aksInfo.clusterName);
  const aksCLI = useSelector((state) => state.user.aksCLI)

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
    fetch("http://localhost:3000/azlogin")
    .then((response) => {
      if (response.status === 200) {
        console.log("we did it!!!!");
        dispatch(aksCLIInfo())
        dispatch(aksForm());
      } else if (response.status === 404) {
        dispatch(aksCLIInfo());
      }
      })
    .catch((err) => {
      console.log(`This is error in AKS fetch: ${err}`)
    })
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
        <span id="buttonSpan">
        <button
        className="newButton" role="button"
          onClick={() => {
            dispatch(cloudInfo());
            dispatch(dontShowPrompt());
          }}
        >
          Connect to Cloud Cluster
        </button>
        <button
        className="newButton" role="button"
          onClick={() => {
            dispatch(localInfo());
            dispatch(dontShowPrompt());
          }}
        >
          Connect to Local Cluster
        </button>
      </span>
      ) : null}

      {cloud ? (
        <div>
          {aksCLI ? <AzCLIInst/> : null}
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
          <LocalInst/>
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
