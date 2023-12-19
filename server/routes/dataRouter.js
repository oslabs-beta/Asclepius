const express = require("express");
const dataRouter = express.Router();

const dataController = require("../controllers/dataController.js");
//Default route to pull node data if user has a current kubeconfig file
dataRouter.get("/", dataController.kubectlInstall, (req, res) => {
  if (res.locals.kubeInstalled === false) {
    res.send("false");
  } else res.redirect("getData/nodes");
});
dataRouter.get(
  "/nodes",
  dataController.getName,
  dataController.getNodeData,
  (req, res) => {
    console.log("final form data", res.locals.data);
    res.json(res.locals.data);
  }
);
// dataController.getName,
module.exports = dataRouter;
