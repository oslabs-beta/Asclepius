import React from 'react';
import NodeMap from '../components/NodeMap.jsx';

function NodeMapContainer() {
    // const nodes = [
    //     { id: 1, name: 'Node 1' },
    //     { id: 2, name: 'Node 2' },
    //     { id: 3, name: 'Node 3' },
    //     { id: 4, name: 'Node 4' },
    //     { id: 5, name: 'Node 5' },
    //     { id: 6, name: 'Node 6' },
    // ];

    // const links = [
    //     { source: 0, target: 2 },
    //     { source: 1, target: 3 },
    //     { source: 1, target: 4 },
    //     { source: 1, target: 5 },
    //     { source: 1, target: 6 },
    //     { source: 2, target: 1 },
    // ];

    return (
        <div id="NodeMapContainer">
            <NodeMap/>
        </div>
    )   

}

export default NodeMapContainer;