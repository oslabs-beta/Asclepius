import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setData, setSidebarData } from "../redux/slices/nodeSlice.js";
import image from "../assets/k8sicon.png";

function NodeMap() {
  const dispatch = useDispatch();
  const nodeData = useSelector((state) => state.node.clusterName);

  const data = useSelector((state) => state.node.nodes);
  const sidebarData = useSelector((state) => state.node.sidebarData);
  //const [nodePositions, setNodePositions] = useState(nodes.map(node => ({ x: node.x, y: node.y })));
  //shape of data:
  // const nodeData = {
  //   name: 'aks-agentpool-29810547-vmss000002',
  //          cpuCores: '161m',
  //          memBytes: '1439Mi',
  //          cpuPercentage: '8%',
  //          memPercentage: '31%',
  //          color: 'rgb(144, 238, 144)',
  //          pods: [ 'prometheus-prometheus-node-exporter-77b64' ]
  //         };
  // const nodeData = {
  //   name: resultArray[0],
  //   cpuCores: resultArray[1],
  //   memBytes: resultArray[3],
  //   cpuPercentage: resultArray[2],
  //   memPercentage: resultArray[4],
  //   color: color,
  //   pods: ["name", "name"]
  // };

  //helper function takes in node name that was clicked
  const setSidebar = (name) => {
    if (name === sidebarData.name || name === "Master Node") {
      dispatch(setSidebarData({}));
    } else {
      const sbData = data.find((el) => el.name === name);
      console.log("pre-dispatch sbData", sbData);
      dispatch(setSidebarData(sbData));
    }
  };

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
    }, 5000);
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
  console.log(nodes);
  nodes.unshift({ id: 0, name: "Master Node", color: "lightgrey" });

  const links = nodes
    .slice(1)
    .map((node) => ({ source: nodes[0], target: node.id }));

  const width = 350;
  const height = 200;

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width);

    const group = svg
      .append("g")
      .attr("transform", "translate(" + width + "," + 500 + ")rotate(-70)");

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
      .style("stroke", "black")
      .attr("opacity", 1);

    //changes the radius of nodes depending on number of nodes rendered
    const scale = Math.min(70, 490 / nodes.length);
    const maxFontSize = scale * 0.6;
    // Create nodes
    const node = group
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", scale)
      .style("stroke", "black")
      .attr("fill", (d) => d.color)
      .on("click", function (event, d) {
        //call helper function
        //d.id should be a string node name
        setSidebar(d.name);
        // console.log("nodewas clicked", d.name)
      });
    const label = group
      .selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      // .on("mouseover", function (d) {
      //   d3.select(this).style("opacity", 1);
      // })
      // .on("mouseout", function (d) {
      //   d3.select(this).style("opacity", 0);
      // })
      .style("opacity", 1)
      .style("font-family", "Play, sans-serif")
      .style("font-size", 15)
      .text((d) => d.name);

    function getColorBasedOnNodeId(nodeId) {
      // Add your logic to determine the color based on the node ID
      // For example, you can use a switch statement or an if-else block
      // Return the color for the specified node ID
      switch (nodeId) {
        case 3:
          return "yellow";
        case 9:
          return "yellow";
        case 6:
          return "yellow";
        case 5:
          return "red";
        case 0:
          return "gray";
        // Add more cases as needed
        default:
          return "green";
      }
    }

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
      label.attr("transform", (d) => `rotate(70, ${d.x}, ${d.y})`);
    }
  }, []); //positions

  // nodes, links, dispatch

  return (
    <div id="innerNodeMapContainer">
      <svg ref={svgRef} id="NodeMap"></svg>
    </div>
  );
}

export default NodeMap;
