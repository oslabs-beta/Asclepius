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

  //Function to install Azure CLI
  //need to test
  installAzureCli: (req, res, next) => {

    //return to install info page for MVP

    if (res.locals.azInstalled === true) {
      return next();
    } else 
    console.log("Azure CLI is not installed. Installing...");
    // const result = spawnSync(
    //   "curl",
    //   ["-sL", "https://aka.ms/InstallAzureCLIDeb | sudo bash"],
    //   { encoding: "utf-8", shell: true }
    // );


    //PC AZ CLI INSTALL

    // const result = spawnSync(
    //   'powershell.exe',
    //   [
    //     '-Command',
    //     'Invoke-WebRequest -Uri https://aka.ms/InstallAzureCliWindows -OutFile azure_installer.ps1; ./azure_installer.ps1',
    //   ],
    //   { encoding: 'utf-8', shell: true }
    // )
    // if (result.status === 0) {
    //   console.log('Azure CLI has been successfully installed.');
    // } else {
    //   console.error('Error installing Azure CLI:', result.error || result.stderr);
    // }
    // console.log("azCLI result:", result)

    // if (result.stderr) {
    //   console.error("Failed to install Azure CLI:", result.stderr);


      //INSTALL azure-cli with brew for MAC OR LINUX
    //   const result = spawnSync(
    //     'brew',
    //     ['install', 'azure-cli'],
    //     { encoding: 'utf-8', shell: true }
    //   );
      
    //   if (result.status === 0) {
    //     console.log('Azure CLI has been successfully installed.');
    //   } else {
    //     console.error('Error installing Azure CLI:', result.error || result.stderr);
    //   }
    // }
    return next();
  },
  
  azLogin: (req, res, next) => {
    if (res.locals.azInstalled === false) {
      return next()
    }
    const result = spawnSync("az", ["login"], {
      encoding: "utf-8",
      shell: true,
    });
    console.log('this is result in azLogin middleware', result);
    if (result.stderr) {
      stderrresult = result.stderr.split('')
    //check if the first letter in output for stderr is capital E for Error
      if (result[0] === 'E') {
        return next({
          log: `azLogin has caught an error with the result of "az login", ${result.stderr}`,
          status: 500,
          message: { err: 'An error occured'},
        })
      }
    }
    console.log('right before next() in azLogin')
    return next();
  },


  azCredentials: (req, res, next) => {
    const { clusterName, resourceGroup } = req.body;
    console.log("body", req.body);
    //az aks get-credentials --name ${name} --resource-group ${resource-group}
    const result = spawnSync(
      "az",
      [
        "aks",
        "get-credentials",
        `--name ${clusterName}`,
        `--resource-group ${resourceGroup}`
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
    } else {
      return next();
    }
  },
};

module.exports = azController;
