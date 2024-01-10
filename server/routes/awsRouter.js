const express = require("express");
const awsRouter = express.Router();

const awsController = require("../controllers/awsController.js");

awsRouter.post(
  "/",
  awsController.isAWSCLIInstalled,
  awsController.awsConfigure,
  awsController.awsMetrics,
  (req, res) => {
    if (res.locals.awsInstalled === true) {
      console.log("hello");
      res.status(200).send("success");
    } else if (res.locals.awsInstalled === false) {
      console.log("hi");
      res.status(404).send("failure");
    }
  }
);

//should come with req.body {name: demoAKS resource-group: aksRG}
awsRouter.post("/auth", awsController.awsAuthenticate, (req, res) => {
  res.status(200).send("success");
});
// dataController.getName,
module.exports = awsRouter;
