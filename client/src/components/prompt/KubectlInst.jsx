const React = require('react')

const KubectlInst = () => {
  return (
    <div>
      <h2>Install kubectl:</h2>
      <p>
        To begin, install the Kubernetes command-line tool, kubectl, using one of the following methods:
      </p>
      <pre>
        <code>
          {/* Linux */}
          sudo apt-get update && sudo apt-get install -y kubectl

          {/* macOS */}
          brew install kubectl

          {/* Windows */}
          Download the kubectl executable from <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/#install-kubectl-binary-using-curl">here</a> and add it to your system's PATH.
        </code>
      </pre>
    </div>
  );
};

export default KubectlInst;