const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dataRouter = require("./routes/dataRouter.js");
const azRouter = require("./routes/azRouter.js");
app.set("port", 3000);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/", express.static(path.join(__dirname, "../client")));

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});
app.get("/sayhi", (req, res) => {
  res.send("Hello!!");
});
app.use("/getData", dataRouter);

app.use("/azlogin", azRouter);

app.listen(app.get("port"), function () {
  console.log("express server listening on port " + 3000);
});
