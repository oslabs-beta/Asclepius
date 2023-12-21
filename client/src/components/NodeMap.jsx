import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import {setData} from "../redux/slices/nodeSlice.js"

function NodeMap() {
  const dispatch = useDispatch()
  const nodeData = useSelector((state) => state.node.clusterName)

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
  nodes.unshift({ id: 0, name: "Master Node", color: "Green" });

  const links = nodes.slice(1).map((node) => ({ source: 0, target: node.id }));
  // console.log("This is links:", links);

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
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(height, width / 2))
      .on("tick", ticked);

    const link = group
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link");

    //changes the radius of nodes depending on number of nodes rendered
    const scale = Math.min(40, 400 / nodes.length);

    // Create nodes
    const node = group
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", scale)
      .attr("fill", (d) => d.color);
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
        .attr("x1", (d) => d.source.y)
        .attr("y1", (d) => d.source.x)
        .attr("x2", (d) => d.target.y)
        .attr("y2", (d) => d.target.x);

      node.attr("cx", (d) => d.y).attr("cy", (d) => d.x);

      label.attr("x", (d) => d.y).attr("y", (d) => d.x);
    }
  }, [nodes, links]);

  return (
    <div id="NodeMapContainer">
      <svg ref={svgRef} id="NodeMap"></svg>
    </div>
  );
}

export default NodeMap;
