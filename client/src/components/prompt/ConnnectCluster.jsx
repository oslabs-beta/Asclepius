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
  aws,
} from "../../redux/slices/userSlice.js";
import LocalInst from "./LocalInst.jsx";
import AzCLIInst from "./AzCLIInst.jsx";
import AwsForm from "./AwsForm.jsx";

function ConnectCluster() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.showPrompt);

  //Booleans from state to conditionally render elements in the return statement
  const cloud = useSelector((state) => state.user.cloudInfo);
  const local = useSelector((state) => state.user.localInfo);
  const aks = useSelector((state) => state.user.aksForm);
  const result = useSelector((state) => state.user.aksResult);
  const aksCLI = useSelector((state) => state.user.aksCLI);
  const awsForm = useSelector((state) => state.user.awsForm);

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
        console.log("this is response in AKS FETCH:", response.status);
        if (response.status === 200) {
          console.log("we did it!!!!");
          dispatch(cloudInfo());
          dispatch(aksForm());
        } else if (response.status === 404) {
          dispatch(aksCLIInfo());
        }
      })
      .catch((err) => {
        console.log(`This is error in AKS fetch: ${err}`);
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
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        dispatch(aksInput(true));
      } else dispatch(aksInput(false));
    });
  };

  return (
    <div>
      {show ? (
        <span id="buttonSpan">
          <button
            className="newButton"
            role="button"
            onClick={() => {
              dispatch(cloudInfo());
              dispatch(showPrompt());
            }}
          >
            Connect to Cloud Cluster
          </button>
          <button
            className="newButton"
            role="button"
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
          <div>
            {aksCLI ? <AzCLIInst /> : null}
            <button
              id="aksButton"
              className="newButton"
              role="button"
              onClick={() => {
                AKSfetch();
              }}
            >
              Connect to AKS-hosted Cluster
            </button>
          </div>
          <div>
            {/* {awsCLI ? <AwsCLIInst /> : null} */}

            <button
              id="awsButton"
              className="newButton"
              role="button"
              onClick={() => {
                dispatch(aws());
                dispatch(cloudInfo());
              }}
            >
              Connect to AWS-hosted Cluster
            </button>
          </div>
        </div>
      ) : null}
      {awsForm ? <AwsForm /> : null}
      {local ? (
        <div id="instructions">
          <LocalInst />
        </div>
      ) : null}

      {aks ? (
        <div>
          <form onSubmit={aksSubmit}>
            <label>Cluster Name:</label>
            <input type="text" name="clusterName" className="inputBox" />
            <label>Resource Group Name:</label>
            <input type="text" name="resourceGroup" className="inputBox" />
            <button type="submit">Save Cluster Info</button>
          </form>
          {result === true ? (
            <div>
              Successfully added a Kube config file, please try to Render Node
              Map!
              <button
                id="aksButton"
                className="newButton"
                onClick={() => {
                  dispatch(aksForm());
                  // dispatch(showPrompt());
                }}
              >
                Done!
              </button>
            </div>
          ) : null}
          {result === false ? (
            <div>Failed to add a Kube config file, please try again!</div>
          ) : null}
        </div>
      ) : null}

      {aksCLI || aks || show || local || cloud || awsForm ? null : (
        <button
          id="renderButton"
          className="newButton"
          onClick={() => getData()}
        >
          Render Node Map
        </button>
      )}
    </div>
  );
}

export default ConnectCluster;
