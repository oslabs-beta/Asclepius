import React from 'react';
import NodeMap from '../components/NodeMap.jsx';
import Prompt from '../components/Prompt.jsx';
import { useSelector } from 'react-redux';
import NodeMapHeader from '../components/NodeMapHeader.jsx';

function NodeMapContainer() {
  //useSelector to listen for boolean state (do we have data?)
  const stateData = useSelector((state) => {
    return state.node.clusterName;
  });
  console.log(stateData);

  // const nodes = [
  //     { id: 1, name: 'Node 1' },
  //     { id: 2, name: 'Node 2' },
  //     { id: 3, name: 'Node 3' },
  //     { id: 4, name: 'Node 4' },
  //     { id: 5, name: 'Node 5' },
  //     { id: 6, name: 'Node 6' },
  //     { id: 7, name: 'Node 7' },
  //     { id: 8, name: 'Node 8' },
  //     { id: 9, name: 'Node 9' },
  //     { id: 10, name: 'Node 10' },
  //     { id: 11, name: 'Node 11' },
  //     { id: 12, name: 'Node 12' }, 
  //     { id: 13, name: 'Node 13' },
  //     { id: 14, name: 'Node 14' },
  //     { id: 15, name: 'Node 15' },
  //     { id: 16, name: 'Node 16' },
  // ];

  // const links = [
  //     { source: 0, target: 1 },
  //     { source: 0, target: 2 },
  //     { source: 0, target: 3 },
  //     { source: 0, target: 4 },
  //     { source: 0, target: 5 },
  //     { source: 0, target: 6 },
  //     { source: 0, target: 7 },
  //     { source: 0, target: 8 },
  //     { source: 0, target: 9 },
  //     { source: 0, target: 10 },
  //     { source: 0, target: 11 },
  //     { source: 0, target: 12 },
  //     { source: 0, target: 13 },
  //     { source: 0, target: 14 },
  //     { source: 0, target: 15 },
  //     { source: 0, target: 16 },
  // ];

  return (
    <div id='NodeMapContainer'>
      <NodeMapHeader />
      {stateData === '' ? <Prompt /> : <NodeMap />}
    </div>
  );
}

export default NodeMapContainer;
