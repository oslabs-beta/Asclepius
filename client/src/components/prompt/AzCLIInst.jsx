import React from "react";
import { useDispatch } from "react-redux";
import booleanSet from "../../redux/slices/userSlice.js";

const AzCLIInst = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Install Azure CLI:</h2>
      <ol>
        <li>
          <strong>Linux:</strong>
          <pre>
            <code>curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash</code>
          </pre>
        </li>
        <li>
          <strong>macOS:</strong>
          <pre>
            <code>brew update && brew install azure-cli</code>
          </pre>
        </li>
        <li>
          <strong>Windows:</strong>
          <pre>
            <code>
              Download the MSI installer from{" "}
              <a href="https://aka.ms/installazurecliwindows">here</a> and
              follow the installation wizard.
            </code>
          </pre>
        </li>
      </ol>
      <button
        className="newButton"
        role="button"
        onClick={() => dispatch(booleanSet("aksCLIInfo"))}
      >
        Azure CLI Installed
      </button>
    </div>
  );
};

export default AzCLIInst;
