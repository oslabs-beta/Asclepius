const express = require("express");
const azRouter = express.Router();

const azController = require("../controllers/azController.js");
azRouter.get(
  "/",
  azController.isAzureCliInstalled,
  // azController.installAzureCli,
  azController.azLogin,
  (req, res) => {
    console.log('this is res.locals in azcontroller', res.locals)
    //prompt user for resource group and cluster name
    console.log('This is res.locals.isAzureCliInstalled: ', res.locals.azInstalled)
    if (res.locals.azInstalled) {
      res.status(200).send("success")
    } else {
      res.status(404).send("failure")
    }
  }
);

//should come with req.body {name: demoAKS resource-group: aksRG}
azRouter.post("/", azController.azCredentials, (req, res) => {
  res.status(200).send("success");
});
// dataController.getName,
module.exports = azRouter;
