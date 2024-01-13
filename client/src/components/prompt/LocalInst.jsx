import React from "react";
import { useDispatch } from "react-redux";
import { booleanSet } from "../../redux/slices/userSlice.js";

const LocalInst = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Set Up Local Kubernetes Cluster and kubeconfig File:</h2>
      <p>
        Follow the steps below to set up a local Kubernetes cluster and
        configure the kubeconfig file:
      </p>
      <ol>
        <li>
          <strong>Install a Local Kubernetes Cluster:</strong>
          <pre>{/* Instructions for installing a local cluster */}</pre>
        </li>
        <li>
          <strong>Start the Local Cluster:</strong>
          <pre>{/* Instructions for starting the local cluster */}</pre>
        </li>
        <li>
          <strong>Configure kubectl:</strong>
          <pre>
            <code>
              {/* Set kubectl context */}
              kubectl config set-context &lt;context-name&gt;
              --cluster=&lt;cluster-name&gt; --user=&lt;user-name&gt; kubectl
              config use-context &lt;context-name&gt;
            </code>
          </pre>
        </li>
      </ol>
      <p>
        Adjust the context name, cluster name, and user name according to your
        local cluster configuration. These instructions assume you've already
        installed kubectl.
      </p>
      <button
        id="localButton"
        className="newButton"
        role="button"
        onClick={() => dispatch(booleanSet("localInfo"))}
      >
        Local Cluster Setup Complete
      </button>
    </div>
  );
};

export default LocalInst;
