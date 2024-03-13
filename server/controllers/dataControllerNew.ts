import { spawn, spawnSync, SpawnSyncReturns } from "child_process";
import { Request, Response, NextFunction } from "express";
import { Data, NodeData } from "../types";
const k8s = require("@kubernetes/client-node");

const dataControllerNew = {
  main: async (req: Request, res: Response, next: NextFunction) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    try {
      const podsRes = await k8sApi.listNode("default");
      const result = [];
      console.log(podsRes.body);
      console.log("metadata", podsRes.body.items[0].status)
      podsRes.response.body.items.forEach((el) => {
        result.push({
          name: el.metadata.name,
          uid: el.metadata.uid,
          creationTimestamp: el.metadata.creationTimestamp,
          capacity: {
            cpuCapacity: el.status.capacity.cpu,
            memoryCapacity: el.status.capacity.memory,
            podsCapacity: el.status.capacity.pods,
          },
          conditions: el.status.conditions[4],
          totalImages: el.status.images.length,
        });
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    return next();
  },

  
};

export = dataControllerNew;
