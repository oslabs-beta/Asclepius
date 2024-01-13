import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/nodeSlice.js";
import { booleanSet, aksInput } from "../../redux/slices/userSlice.js";
import LocalInst from "./LocalInst.jsx";
import AzCLIInst from "./AzCLIInst.jsx";
import AwsForm from "./AwsForm.jsx";

function ConnectCluster() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.showPrompt);

  //Booleans from state to conditionally render elements in the return statement
  const { cloudInfo, localInfo, aksForm, aksResult, aksCLI, awsForm } =
    useSelector((state) => state.user);

  const getData = () => {
    fetch(`http://localhost:3000/getData`)
      .then((data) => data.json())
      .then((data) => {
        console.log("this is the data I need: ", data);
        if (data === false) {
          dispatch(booleanSet("kubectlSet"));
        } else if (data.clusterName === "") {
          dispatch(booleanSet("showPrompt"));
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
          dispatch(booleanSet("cloudInfo"));
          dispatch(booleanSet("aksForm"));
        } else if (response.status === 404) {
          dispatch(booleanSet("aksCLIInfo"));
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
              dispatch(booleanSet("cloudInfo"));
              dispatch(booleanSet("showPrompt"));
            }}
          >
            Connect to Cloud Cluster
          </button>
          <button
            className="newButton"
            role="button"
            onClick={() => {
              dispatch(booleanSet("localInfo"));
              dispatch(booleanSet("showPrompt"));
            }}
          >
            Connect to Local Cluster
          </button>
        </span>
      ) : null}

      {cloudInfo ? (
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
                dispatch(booleanSet("awsForm"));
                dispatch(booleanSet("cloudInfo"));
              }}
            >
              Connect to AWS-hosted Cluster
            </button>
          </div>
        </div>
      ) : null}
      {awsForm ? <AwsForm /> : null}
      {localInfo ? (
        <div>
          <LocalInst />
        </div>
      ) : null}

      {aksForm ? (
        <div>
          <form onSubmit={aksSubmit}>
            <label>Cluster Name:</label>
            <input type="text" name="clusterName" className="inputBox" />
            <label>Resource Group Name:</label>
            <input type="text" name="resourceGroup" className="inputBox" />
            <button type="submit">Save Cluster Info</button>
          </form>
          {aksResult === true ? (
            <div>
              Successfully added a Kube config file, please try to Render Node
              Map!
              <button
                id="aksButton"
                className="newButton"
                onClick={() => {
                  dispatch(booleanSet("aksForm"));
                  // dispatch(showPrompt());
                }}
              >
                Done!
              </button>
            </div>
          ) : null}
          {aksResult === false ? (
            <div>Failed to add a Kube config file, please try again!</div>
          ) : null}
        </div>
      ) : null}

      {aksCLI || aksForm || show || localInfo || cloudInfo || awsForm ? null : (
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
