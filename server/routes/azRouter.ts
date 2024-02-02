import express, { Router, Request, Response } from "express";
import * as azController from "../controllers/azController";

const azRouter: Router = express.Router();

azRouter.get(
  "/",
  azController.isAzureCliInstalled,
  // azController.installAzureCli,
  azController.azLogin,
  (req: Request, res: Response) => {
    console.log("this is res.locals in azcontroller", res.locals);
    // prompt user for resource group and cluster name
    console.log(
      "This is res.locals.isAzureCliInstalled: ",
      res.locals.azInstalled
    );
    if (res.locals.azInstalled) {
      res.status(200).send("success");
    } else {
      res.status(404).send("failure");
    }
  }
);

// should come with req.body {name: demoAKS resource-group: aksRG}
azRouter.post("/", azController.azCredentials, (req: Request, res: Response) => {
  if (res.locals.formsuccess === false) {
    res.status(404).send("failure");
  } else {
    res.status(200).send("success");
  }
});

export = azRouter;
