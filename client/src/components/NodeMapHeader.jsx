import React from 'react';
import { useSelector } from 'react-redux';

function NodeMapHeader() {
  const clusterName = useSelector((state) => state.node.clusterName);

  return (
    <div
      id='NodeMapHeaderDiv'
      style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
    >
      <div id='underline'>Cluster Name:</div>
      {'\n'}
      <div>{clusterName}</div>
    </div>
  );
}

export default NodeMapHeader;
