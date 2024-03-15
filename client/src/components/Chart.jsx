import React, { useState, useEffect } from "react";


const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // {
  //   name: ,
  //   uid: ,
  //   creationTimestamp: ,
  //   capacity: {
  //     cpuCapacity: ,
  //     memoryCapacity: ,
  //     podsCapacity: ,
  //   },
  //   conditions: [{
      // type: 'FilesystemCorruptionProblem',
      // status: 'False',
      // lastHeartbeatTime: '2024-03-14T20:28:03Z',
      // lastTransitionTime: '2024-03-13T19:03:37Z',
      // reason: 'FilesystemIsOK',
      // message: 'Filesystem is healthy'
      // }],
  //   totalImages: ,
  // }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/getData/api'); // Fetches from your defined route
            const data = await response.json();
            setChartData(data);
        };

        fetchData();
    }, []);

    console.log(chartData)

    const handleNodeChange = (event) => {
      setSelectedNode(chartData.filter((el) => el.name === event.target.value)[0]);
    };
    console.log("node", selectedNode)

    


  return (
    <div className="chartContainer">
    <div className="chart">
      {/* Dropdown */}
      <select className="select" value={selectedNode || ''} onChange={handleNodeChange}>
      <option selected >
          Please select a Node
        </option>
        {chartData.map((node) => (
          <option key={node.uid} value={node.name}>
            {node.name}
          </option>
          
        ))}
      </select>

      {/* Node Information Display */}
      {selectedNode && (
        <div className="node-details">
          <div className="name">
          <h2>{selectedNode.name}</h2>
          <ul>
            <li>UID: {selectedNode.uid}</li>
            <li>Creation Timestamp: {selectedNode.creationTimestamp}</li>
            <li>Total Images: {selectedNode.totalImages}</li>
            {/* ... Display other properties */}
          </ul>
          </div>
          <div className="capacity">
            <h3>Resource Capacity</h3>
            <ul>
              <li>Memory: {selectedNode.capacity.memoryCapacity}</li>
              <li>CPU: {selectedNode.capacity.cpuCapacity}</li>
              <li>Pods: {selectedNode.capacity.podsCapacity}</li>
            </ul>
          </div>
          <div className="allocatable">
          <h3>Resource Available</h3>
          <ul>
              <li>Memory: {selectedNode.allocatable.memoryAvailable}</li>
              <li>CPU: {selectedNode.allocatable.cpuAvailable}</li>
              <li>Pods: {selectedNode.allocatable.podsAvailable}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
    <div>
    {selectedNode && <div className="conditions-grid"> 
    {selectedNode.conditions.map((condition) => (
      <ConditionCard key={condition.type /* Or a unique identifier if available */} condition={condition} />
    ))}
  </div>}
  </div>
  </div>
  );
};

const ConditionCard = ({ condition}) => {
  const getHealthColor = (conditionStatus) => {
    // Adjust this to your specific color scheme 
    if (condition.type === 'Ready') {
      return 'green'
    }
    switch (conditionStatus.toLowerCase()) {
      case 'true': return 'red';
      case 'false': return 'green'; 
      default: return 'gray'; // Unknown status
    }
  }
  const setActive = (event) => {
    event.target.classList.toggle('active')
  }
  return (
    <div className="condition-card" onClick={setActive} value={condition.type} style={{ backgroundColor: getHealthColor(condition.status) }}>
      <div >
        {condition.type} 
      </div>
        <ul>
          <li>Status: {condition.status}</li>
          <li>lastHeartbeatTime: {condition.lastHeartbeatTime}</li>
          <li>lastTransitionTime: {condition.lastTransitionTime}</li>
          <li>reason: {condition.reason}</li>
          <li>message: {condition.message}</li>
        </ul>
    </div>
  );
};

export default Chart;
