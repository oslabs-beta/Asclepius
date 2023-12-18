const express = require("express");
const azRouter = express.Router();

const azController = require("../controllers/azController.js");
azRouter.get(
  "/",
  azController.isAzureCliInstalled,
  azController.installAzureCli,
  azController.azLogin,
  (req, res) => {
    //prompt user for resource group and cluster name
    res.send("send them to the form for name and resourcegroup");
  }
);
//should come with req.body {name: demoAKS resource-group: aksRG}
azRouter.post("/", azController.azCredentials, (req, res) => {
  res.redirect("/getData");
});
// dataController.getName,
module.exports = azRouter;
