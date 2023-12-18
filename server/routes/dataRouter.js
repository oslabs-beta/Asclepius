const express = require("express");
const dataRouter = express.Router();

const dataController = require("../controllers/dataController.js");

dataRouter.get("/", dataController.getName, (req, res) => {
  console.log("hello");
  console.log(res.locals.cluster);
  res.json(res.locals.cluster);
});
// dataController.getName,
module.exports = dataRouter;
