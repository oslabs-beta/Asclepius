import React from 'react';
import { useSelector } from 'react-redux';

function Sidebarsection() {
  const data = useSelector((state) => state.node.sidebarData);
  return (
    <div id='Sidebarsection'>
      <div id='sidebarName'>
        <h2>Node Name:</h2>
        <h4>{data.name}</h4>
      </div>
      <div className='metrics'>
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
      </div>
      <div className='metrics'>
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
      </div>
      <h3>Pods:</h3>
      <ul>
        {data.pods.map((pod, index) => (
          <li key={index}>{pod}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebarsection;
