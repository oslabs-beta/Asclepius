const { spawn, spawnSync } = require("child_process");

const awsController = {
  isAWSCLIInstalled: (req, res, next) => {
    const result = spawnSync("aws", ["--version"], {
      encoding: "utf-8",
      shell: true,
    });
    if (result.stderr) {
      res.locals.awsInstalled = false;
      return next();
    } else res.locals.awsInstalled = true;
    return next();
  },

  awsConfigure: (req, res, next) => {
    const { profileName, region, accessID, accessKey } = req.body;
    if (res.locals.awsInstalled === false) {
      return next();
    }
    const result = spawnSync(
      "aws",
      [
        "configure",
        "--profile",
        profileName,
        "--region",
        region,
        "--output json",
        "--aws_access_key_id",
        accessID,
        "--aws_secret_access_key",
        accessKey,
      ],
      { encoding: "utf-8", shell: true }
    );
    console.log("this is result in awsConfigure middleware", result);
    if (result.stderr) {
      stderrresult = result.stderr.split("");
      //check if the first letter in output for stderr is capital E for Error
      if (result[0] === "E") {
        return next({
          log: `awsConfigure has caught an error with the result of "aws configure", ${result.stderr}`,
          status: 500,
          message: { err: "An error occured" },
        });
      }
    }
    console.log("right before next() in awsConfigure");
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

module.exports = awsController;
