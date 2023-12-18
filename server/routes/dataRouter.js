const express = require("express");
const dataRouter = express.Router();

const dataController = require("../controllers/dataController.js");
//Default route to pull node data if user has a current kubeconfig file
dataRouter.get(
  "/",
  dataController.getName,
  dataController.getNodeData,
  (req, res) => {
    console.log("final form data", res.locals.data);
    if (res.locals.data === "") {
      //Will be path that prompts user to select if their cluster is local or cloud hosted and begin setup
      res.send("empty");
    } else res.json(res.locals.data);
  }
);
// dataController.getName,
module.exports = dataRouter;
