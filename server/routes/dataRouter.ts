import express, { Router, Request, Response } from "express";
import * as dataController from "../controllers/dataController";
import * as dataControllerNew from "../controllers/dataControllerNew";

const dataRouter: Router = express.Router();

// Default route to pull node data if the user has a current kubeconfig file
dataRouter.get(
  "/",
  dataController.kubectlInstall,
  (req: Request, res: Response) => {
    if (res.locals.kubeInstalled === false) {
      res.status(200).send(false);
    } else {
      res.redirect("getData/nodes");
    }
  }
);

dataRouter.get(
  "/nodes",
  dataControllerNew.main,
  dataController.getName,
  dataController.getNodeData,
  dataController.getPodData,
  (req: Request, res: Response) => {
    res.json(res.locals.data);
  }
);

export = dataRouter;
