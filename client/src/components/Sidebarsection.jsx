import React from "react";
import { useSelector } from "react-redux";

function Sidebarsection() {
  // const data = useSelector((state) => state.node.sidebarData);

  const data = {
    name: "Node1",
    cpuPercentage: "28",
    cpuCores: "4",
    memPercentage: "50",
    memBytes: "99",
    pods: ["pod1", "pod2", "pod3"],
  };
  return (
    <div id="sideBar">
      <div id="hidden"></div>
      <div id="cluster">Cluster Name: DemoAKS</div>
      <hr></hr>
      <div id="small">
        <table>
          <thead>
            <tr>
              <th>Node Name:</th>
              <td></td>
              <td>{data.name}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div id="cpu">
        <div>
          <table>
            <thead>
              <tr>
                <th>CPU %:</th>
                <td></td>
                <td> {data.cpuPercentage}%</td>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>CPU Cores:</th>
                <td></td>
                <td>{data.cpuCores}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="mem">
        <div>
          <table>
            <thead>
              <tr>
                <th>Memory %:</th>
                <td></td>
                <td>{data.memPercentage}%</td>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Memory Bytes:</th>
                <td></td>
                <td>{data.memBytes}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="big">
        <div>Pods:</div>
        <div>
          <ul id="list">
            {data.pods.map((pod, index) => (
              <li key={index}>{pod}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebarsection;
