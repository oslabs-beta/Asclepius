import { spawn, spawnSync } from "child_process";
import { Request, Response, NextFunction } from "express";

interface AzController {
  isAzureCliInstalled: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  azLogin: (req: Request, res: Response, next: NextFunction) => void;
  azCredentials: (req: Request, res: Response, next: NextFunction) => void;
}

const azController = {
  isAzureCliInstalled: (req, res, next) => {
    const result = spawnSync("az", ["--version"], {
      encoding: "utf-8",
      shell: true,
    });
    console.log(result);
    if (result.stderr) {
      let resultErr = result.stderr.split("");
      //check if the first letter in output for stderr is capital E for Error
      if (resultErr[0] === "W") {
        const upgrade = spawnSync("az", ["upgrade", "--yes"], {
          encoding: "utf-8",
          shell: true,
        });
        console.log(upgrade);
        if (!upgrade.stderr) {
          return next();
        }
      }
      res.locals.azInstalled = false;
      return next();
    } else res.locals.azInstalled = true;
    return next();
  },

  azLogin: (req, res, next) => {
    if (res.locals.azInstalled === false) {
      return next();
    }
    const result = spawnSync("az", ["login"], {
      encoding: "utf-8",
      shell: true,
    });
    console.log("this is result in azLogin middleware", result);
    if (result.stderr) {
      let stderrresult = result.stderr.split("");
      //check if the first letter in output for stderr is capital E for Error
      if (result[0] === "E") {
        return next({
          log: `azLogin has caught an error with the result of "az login", ${result.stderr}`,
          status: 500,
          message: { err: "An error occured" },
        });
      }
    }
    console.log("right before next() in azLogin");
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
        `--resource-group ${resourceGroup}`,
      ],
      {
        encoding: "utf-8",
        shell: true,
      }
    );
    console.log(result);
    //result.output[2] should be warning not error
    const code = result.output[2].split(" ");
    console.log("should be status", code[0]);
    if (code[0] === "Error:") {
      console.log(
        "Error: Cluster name or resource group is incorrect. Please try again."
      );
      res.locals.formsuccess = false;
      return next();
    } else if (code[0] === "WARNING:") {
      console.log("here");
      res.locals.formsuccess = true;
      return next();
    }
  },
};

export = azController;
