import express, { Router, Request, Response } from "express";
import * as awsController from "../controllers/awsController";

const awsRouter: Router = express.Router();

awsRouter.post(
  "/",
  awsController.isAWSCLIInstalled,
  awsController.awsConfigure,
  awsController.awsMetrics,
  (req: Request, res: Response) => {
    if (res.locals.awsInstalled === true) {
      console.log("hello");
      res.status(200).send("success");
    } else if (res.locals.awsInstalled === false) {
      console.log("hi");
      res.status(404).send("failure");
    }
  }
);

// should come with req.body {name: demoAKS resource-group: aksRG}
awsRouter.post("/auth", awsController.awsAuthenticate, (req: Request, res: Response) => {
  console.log("auth leaves backend");
  res.status(200).send("success");
});

export = awsRouter;
