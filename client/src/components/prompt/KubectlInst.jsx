import React from "react"
import {useDispatch} from "react-redux"

const KubectlInst = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Install kubectl:</h2>
      <p>
        To begin, install the Kubernetes command-line tool, kubectl, using one of the following methods:
      </p>
      <pre>
        <code>
        <strong>Linux:</strong><br />
          sudo apt-get update && sudo apt-get install -y kubectl<br /><br />

          <strong>MacOS:</strong><br />
          brew install kubectl<br /><br />

          <strong>Windows:</strong><br />
          Download the kubectl executable from <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/#install-kubectl-binary-using-curl">here</a> and add it to your system's PATH.<br />
          Once you've installed kubectl, please click Reconnect Cluster.
        </code>
      </pre>
      <button onClick={() => dispatch(kubectlSet)}>
        Reconnect Cluster
      </button>
    </div>
  ); 
};

export default KubectlInst;