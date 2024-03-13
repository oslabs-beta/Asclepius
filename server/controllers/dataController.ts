import { spawn, spawnSync, SpawnSyncReturns } from "child_process";
import os from "os";
import { Request, Response, NextFunction } from "express";
import { Data, NodeData } from "../types";

const dataController = {
  kubectlInstall: (req: Request, res: Response, next: NextFunction) => {
    const version: SpawnSyncReturns<string> = spawnSync(
      "kubectl",
      ["version"],
      {
        encoding: "utf-8",
        shell: true,
      }
    );
    const client = version.output[1].split(" ");
    if (client[0] !== "Client") {
      res.locals.kubeInstalled = false;
      return next();
    } else {
      return next();
    }
  },

  getName: (req: Request, res: Response, next: NextFunction) => {
    const data: Data = { clusterName: "" };
    const name: SpawnSyncReturns<string> = spawnSync(
      "kubectl",
      ["config", "current-context"],
      {
        encoding: "utf-8",
      }
    );

    data.clusterName = name.stdout.split("\n")[0];
    res.locals.data = data;
    return next();
  },

  getNodeData: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.data.clusterName === "") {
      return next();
    }
    const nodeArr: NodeData[] = [];
    const data: SpawnSyncReturns<string> = spawnSync(
      "kubectl",
      ["top", "nodes"],
      {
        encoding: "utf-8",
      }
    );
    let dataArr: string[] = data.stdout.split("\n");
    dataArr = dataArr.slice(1, -1);
    dataArr.forEach((el) => {
      const regex = /^(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*$/;
      const matches = el.match(regex);
      const resultArray = matches ? matches.slice(1) : [];
      let color = "";
      let cpu: number | string = resultArray[2].slice(0, -1);
      cpu = Number(cpu);
      let mem: number | string = resultArray[4].slice(0, -1);
      mem = Number(mem);
      if (mem > 70 || cpu > 70) {
        color = "red";
      } else if (mem > 50 || cpu > 50) {
        color = "rgb(252, 245, 95)";
      } else {
        color = "rgb(144, 238, 144)";
      }
      const nodeData: NodeData = {
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

  getPodData: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.data.clusterName === "") {
      return next();
    }
    const nodeData: NodeData[] = res.locals.data.nodes;
    nodeData.forEach((el) => {
      const nodeName = el.name;
      const podsData: SpawnSyncReturns<string> = spawnSync(
        "kubectl",
        ["get", "pods", "--field-selector", `spec.nodeName=${nodeName}`],
        {
          encoding: "utf-8",
        }
      );
      let podNames = podsData.stdout.match(/^\S+/gm);
      if (podNames) podNames.shift();
      el.pods = podNames || [];
    });
    res.locals.data.nodes = nodeData;
    return next();
  },
};

export = dataController;
