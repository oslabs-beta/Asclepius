const { spawn, spawnSync } = require("child_process");
const fs = require("fs").promises;

const awsController = {
  isAWSCLIInstalled: (req, res, next) => {
    const result = spawnSync("aws", ["--version"], {
      encoding: "utf-8",
      shell: true,
    });
    console.log("aws version: ", result);
    if (result.stderr) {
      res.locals.awsInstalled = false;
      return next();
    } else res.locals.awsInstalled = true;
    return next();
  },

  awsConfigure: async (req, res, next) => {
    const { profileName, region, accessID, accessKey } = req.body;
    if (res.locals.awsInstalled === false) {
      return next();
    }
    const awsFolderPath = `${process.env.HOME || process.env.USERPROFILE}/.aws`;
    const credentialsPath = `${awsFolderPath}/credentials`;
    const configPath = `${awsFolderPath}/config`;

    // AWS credentials content
    const credentialsContent = `[default]\naws_access_key_id = ${accessID}\naws_secret_access_key = ${accessKey}`;

    // AWS config content
    const configContent = `[default]\nregion = ${region}\noutput = json`;

    try {
      // Write credentials file
      await fs.writeFile(credentialsPath, credentialsContent);
      console.log("Credentials file created successfully.");

      // Write config file
      await fs.writeFile(configPath, configContent);
      console.log("Config file created successfully.");
      const result = spawnSync("kubectl", [
        "get pods -n kube-system | grep metrics-server",
      ]);
      if (result.stderr) {
        res.locals.metrics = false;
      } else res.locals.metrics = true;
    } catch (error) {
      console.error("Error creating AWS config files:", error);
    }

    //make 2 config files: credentials and config
    //after success, check "kubectl get pods -n kube-system | grep metrics-server"
    //if success set boolean metrics to true
    //if failure set boolean metrics to false
    return next();
  },

  awsMetrics: (req, res, next) => {
    if (res.locals.metrics === true) {
      return next();
    }
    const result = spawnSync("kubectl", [
      "apply",
      "-f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml",
    ]);
    return next();
  },

  awsAuthenticate: (req, res, next) => {
    const { clusterName } = req.body;
    console.log("body", req.body);
    // Step 1: Authenticate with AWS
    const loginResult = spawnSync("aws", [
      "eks",
      "update-kubeconfig",
      "--name",
      clusterName,
    ]);
    console.log(loginResult.stdout.toString());
    console.error(loginResult.stderr.toString());
    return next();
  },
};

export = awsController;
