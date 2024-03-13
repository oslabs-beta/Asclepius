import React from "react";
import { useSelector } from "react-redux";

function Sidebarsection() {
  const data = useSelector((state) => state.node.sidebarData);
  const name = useSelector((state) => state.node.clusterName);

  let nodeName;
  data.name ? (nodeName = data.name.split("-")) : null;

  return (
    <div id="sideBar">
      <div id="cluster">
        <div>Cluster Name:</div>
        <div>{name ? name : null}</div>{" "}
      </div>
      <div id="small">
        <table>
          <thead>
            <tr>
              <th>Node Name:</th>
              <td></td>
              <td>{nodeName ? nodeName[3] : null}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div id="cpu">
        <div>
          <table>
            <thead>
              <tr>
                <th>CPU:</th>
                <td></td>
                <td> {data ? data.cpuPercentage : null}</td>
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
                <td>{data ? data.cpuCores : null}</td>
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
                <th>Memory:</th>
                <td></td>
                <td>{data ? data.memPercentage : null}</td>
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
                <td>{data ? data.memBytes : null}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="big">
        <div>Pods:</div>
        <div>
          <ul id="list">
            {data.pods
              ? data.pods.map((pod, index) => <li key={index}>{pod}</li>)
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebarsection;
