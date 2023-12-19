const { spawn, spawnSync } = require("child_process");
const dataController = {
  getName: (req, res, next) => {
    console.log("getting name");
    const data = {};
    const name = spawnSync("kubectl", ["config", "current-context"], {
      encoding: "utf-8",
    });
    //zsh: command not found: kubectl
    if (name.stderr) {
      res.redirect("/sayhi");
    }

    data.clusterName = name.stdout.split("\n")[0];
    res.locals.data = data;
    return next();
  },
  getNodeData: (req, res, next) => {
    if ((res.locals.data.clusterName = "")) {
      return next();
    }
    const nodeArr = [];
    console.log("getting data");
    const data = spawnSync("kubectl", ["top", "nodes"], {
      encoding: "utf-8",
    });
    dataArr = data.stdout.split("\n");
    dataArr = dataArr.slice(1, -1);
    console.log(dataArr);
    dataArr.forEach((el) => {
      //Regex will grab the 5 relevant data pieces from 'top nodes'
      const regex = /^(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*$/;

      // Extract matches using the regular expression
      const matches = el.match(regex);

      // Create an array with the 5 captured strings

      const resultArray = matches ? matches.slice(1) : [];
      let color = "";
      let cpu = resultArray[2].slice(0, -1);
      cpu = Number(cpu);
      let mem = resultArray[4].slice(0, -1);
      mem = Number(mem);
      console.log("cpu:", cpu, "mem", mem);
      if (mem > 70 || cpu > 70) {
        color = "red";
      } else if (mem > 50 || cpu > 50) {
        color = "yellow";
      } else color = "green";
      const nodeData = {
        name: resultArray[0],
        cpuPercentage: resultArray[2],
        memPercentage: resultArray[4],
        color: color,
      };
      nodeArr.push(nodeData);
    });
    res.locals.data.nodes = nodeArr;
    console.log("should be name and node data", res.locals);
    return next();
  },
};

module.exports = dataController;
