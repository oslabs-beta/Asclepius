export type NodeData = {
    name: string;
    cpuCores: string;
    memBytes: string;
    cpuPercentage:  string;
    memPercentage: string;
    color: string;
    pods?: string[];
  }

export type Data = {
    clusterName: string;
    nodes?: NodeData[];
  }