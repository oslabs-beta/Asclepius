import React from "react";

const AwsCLIInst = () => {
  return (
    <div>
      <h2>AWS CLI not installed, please follow the instructions below:</h2>
      <ol>
        <li>
          <strong>Linux:</strong>
          <pre>
            <code>
              curl
              "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip"
              -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install
            </code>
          </pre>
        </li>
        <li>
          <strong>macOS:</strong>
          <pre>
            <code>
              curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-macos.zip"
              -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install
            </code>
          </pre>
        </li>
        <li>
          <strong>Windows:</strong>
          <pre>
            <code>
              Download the MSI installer from{" "}
              <a href="https://aws.amazon.com/cli/">here</a> and follow the
              installation wizard.
            </code>
          </pre>
        </li>
      </ol>
    </div>
  );
};

export default AwsCLIInst;
