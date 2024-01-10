import React from "react";
import { useSelector } from "react-redux";

function Sidebarsection() {
  const data = useSelector((state) => state.node.sidebarData);
  return (
    <div id="Sidebarsection">
      <div>
        <h2>{data.name}</h2>
        <table>
          <thead>
            <tr>
              <th>CPU %</th>
              <th>CPU Cores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.cpuPercentage}</td>
              <td>{data.cpuCores}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Memory %</th>
              <th>Memory Bytes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.memPercentage}</td>
              <td>{data.memBytes}</td>
            </tr>
          </tbody>
        </table>

        <h3>Pods:</h3>
        <ul>
          {data.pods.map((pod, index) => (
            <li key={index}>{pod}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebarsection;
