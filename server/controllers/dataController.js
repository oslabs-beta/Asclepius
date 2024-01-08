const { spawn, spawnSync } = require("child_process");
const os = require("os");
const dataController = {
  kubectlInstall: (req, res, next) => {
    // console.log("os arch", os.arch());
    const version = spawnSync("kubectl", ["version"], {
      encoding: "utf-8",
      shell: true,
    });
    console.log("version:", version);
    const client = version.output[1].split(" ");
    if (client[0] !== "Client") {
      res.locals.kubeInstalled = false;
      return next();
    } else return next();
  },

  getName: (req, res, next) => {
    console.log("getting name");
    const data = {};
    const name = spawnSync("kubectl", ["config", "current-context"], {
      encoding: "utf-8",
    });

    data.clusterName = name.stdout.split("\n")[0];
    res.locals.data = data;
    console.log("should be name", res.locals.data);
    return next();
  },
  
  getNodeData: (req, res, next) => {
    if (res.locals.data.clusterName === "") {
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
      console.log("matches", matches)
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
        color = "rgb(252, 245, 95)";
      } else color = "rgb(144, 238, 144)";
      const nodeData = {
        name: resultArray[0],
        cpuCores: resultArray[1],
        memBytes: resultArray[3],
        cpuPercentage: resultArray[2],
        memPercentage: resultArray[4],
        color: color,
      };
      nodeArr.push(nodeData);
    });
    res.locals.data.nodes = nodeArr;
    return next();
  },

  getPodData: (req, res, next) => {
    //Accessing NodeData array and running command to get the pod names for each element (Node)
    if (res.locals.data.clusterName === "") {
      return next();
    }
    const nodeData = res.locals.data.nodes;
    console.log("getting pods");
    nodeData.forEach((el) => {
      const nodeName = el.name;
      const podsData = spawnSync(
        "kubectl",
        ["get", "pods", "--field-selector", `spec.nodeName=${nodeName}`],
        {
          encoding: "utf-8",
        }
      );
      console.log(podsData);
      //Regex to extract the node names from output string
      const podNames = podsData.stdout.match(/^\S+/gm);
      console.log(podNames);
      podNames.shift();
      el.pods = podNames || [];
      console.log(el.pods);
    });
    //Update res.locals with new Node Data that includes a "pods" key for each node
    console.log(nodeData);
    res.locals.data.nodes = nodeData;
    return next();
  },
};

module.exports = dataController;
