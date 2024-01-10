import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import {setData, setSidebarData} from "../redux/slices/nodeSlice.js"

function NodeMap() {
  const dispatch = useDispatch()
  const nodeData = useSelector((state) => state.node.clusterName)
  const data = useSelector((state) => state.node.nodes)
  const sidebarData = useSelector((state) => state.node.sidebarData)

  const setSidebar = (name) => {
    if (name === sidebarData.name) {
      dispatch(setSidebarData({}))
    } else {
      const sbData = data.find((el) => el.name === name);
      console.log("pre-dispatch sbData", sbData)
      dispatch(setSidebarData(sbData))
    }
  }

  useEffect(() => {
    setInterval(() => {
      console.log("firing fetch in setTimeout");
  
      fetch(`http://localhost:3000/getData`)
        .then((data) => data.json())
        .then((data) => {
          console.log("this is the data I need: ", data);
          dispatch(setData(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000); // The delay is set to 0, meaning it will be executed in the next event loop cycle
  }, [nodeData]);

  //creates a link to the DOM
  const svgRef = useRef();

  //grab the updated k8s data from state
  const stateData = useSelector((state) => state.node);

  //iterating through stateData to define nodes and links
  const nodes = stateData.nodes.map((node, ix) => ({
    id: ix + 1,
    name: node.name,
    color: node.color,
  }));
  console.log(nodes)
  nodes.unshift({ id: 'master', name: "Master Node", color: "limegreen" });

  const links = nodes.slice(1).map((node) => ({ source: nodes[0], target: node }));

  const width = 600;
  const height = 300;

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width);

    const group = svg
      .append("g")
      .attr("transform", "translate(" + width / 1.65 + "," + height / 2 + ")");


      const centerX = width / 2.5;
      const centerY = height / 5;
  
      const offset = 100;
      
      const masterNode = group
        .append("circle")
        .attr("class", "node")
        .attr("r", 70) // Set radius
        .attr("cx", centerX) // Set X position at the center
        .attr("cy", centerY) // Set Y position at the center
        .attr("fill", "limegreen"); 
  
      // Create a label for the "Master Node"
      const masterLabel = group
        .append("text")
        .attr("class", "label")
        .attr("dy", 4)
        .attr("text-anchor", "middle")
        .attr("x", centerX) // Set X position at the center
        .attr("y", centerY) // Set Y position at the center
        .text("Master Node"); 
    
        // const workerNodes = nodes.slice(1);
        // const numWorkers = workerNodes.length;
        // const workerSpacing = 2 * offset;
        // const workerStartX = centerX - ((numWorkers - 1) * workerSpacing) / 2;
        
        // workerNodes.forEach((worker, index) => {
        //   worker.x = workerStartX + index * workerSpacing;
        //   worker.y = centerY + offset;
        // });

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(300)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(height, width / 2))
      .on("tick", ticked);

    const link = group
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke-width", 20) 
      .attr("stroke", "black"); 

    //changes the radius of nodes depending on number of nodes rendered
    const scale = Math.min(70, 280 / nodes.length);

    // Create nodes
    const node = group
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", scale)
      .attr("fill", (d) => d.color)
      .on("click", function(event, d) {
        //call helper function
        //d.id should be a string node name
        setSidebar(d.name)
        // console.log("nodewas clicked", d.name)
      })
    const label = group
      .selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .text((d) => d.name);

    function ticked() {
      link
      .attr("x1", (d) => d.source === nodes[0] ? centerX : d.source.x)
      .attr("y1", (d) => d.source === nodes[0] ? centerY : d.source.y)
      .attr("x2", (d) => d.target === nodes[0] ? centerX : d.target.x)
      .attr("y2", (d) => d.target === nodes[0] ? centerY : d.target.y)
  

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    }
  }, [nodes, links, dispatch]);

  return (
    <div id="NodeMapContainer">
      <svg ref={svgRef} id="NodeMap"></svg>
    </div>
  );
}

export default NodeMap;
