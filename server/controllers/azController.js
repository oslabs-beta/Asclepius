const { spawn, spawnSync } = require("child_process");
const azController = {
  isAzureCliInstalled: (req, res, next) => {
    const result = spawnSync("az", ["--version"], {
      encoding: "utf-8",
      shell: true,
    });
    if (result.stderr) {
      res.locals.azInstalled = false;
      return next();
    } else res.locals.azInstalled = true;
    return next();
  },

  // Function to install Azure CLI
  //need to test
  installAzureCli: (req, res, next) => {
    if (res.locals.azInstalled === true) {
      return next();
    }
    console.log("Azure CLI is not installed. Installing...");
    const result = spawnSync(
      "curl",
      ["-sL", "https://aka.ms/InstallAzureCLIDeb | sudo bash"],
      { encoding: "utf-8", shell: true }
    );

    if (result.error) {
      console.error("Failed to install Azure CLI:", result.error);
      process.exit(1);
    }
    return next();
  },
  azLogin: (req, res, next) => {
    console.log("hi");
    const result = spawnSync("az", ["login"], {
      encoding: "utf-8",
      shell: true,
    });
    console.log(result);
    return next();
  },
  azCredentials: (req, res, next) => {
    const { name, resource_group } = req.body;
    //az aks get-credentials --name ${name} --resource-group ${resource-group}
    const result = spawnSync(
      "az",
      [
        "aks",
        "get-credentials",
        `--name ${name}`,
        `--resource-group ${resource_group}`,
      ],
      {
        encoding: "utf-8",
        shell: true,
      }
    );
    console.log(result);
    //result.output[2] should be warning not error
    const code = result.output[2].slice(" ");
    console.log("should be status", code[0]);
    if (code[0] === "E") {
      console.log(
        "Error: Cluster name or resource group is incorrect. Please try again."
      );
    } else if (code[0] === "W") {
      return next();
    }
  },
};

module.exports = azController;
