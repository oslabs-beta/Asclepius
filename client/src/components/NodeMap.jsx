import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

function NodeMap() {
    const svgRef = useRef();

    //grab the updated k8s data from state
    const stateData = useSelector((state) => state.node);

    //iterating through stateData to define nodes and links
    const nodes = stateData.nodes.map((node) => ({ id: node.id, name: node.name, color: node.color}));
    nodes.unshift({ id: 0, name: 'Master Node', color: 'Green'})
    const links = nodes.slice(1).map((link) => ({source: 0, target: link.id}));

   const width = 600;
   const height = 300;
   
    useEffect(() => {
    //     d3.select(svgRef.current).selectAll("*").remove();
        const svg = d3.select(svgRef.current).attr('height', height).attr('width', width);
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        const link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link");

        // Create nodes
        const node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 20);
            const label = svg.selectAll(".label")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("dy", 4)
            .attr("text-anchor", "middle")
            .text(d => d.name);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        }
    }, [nodes, links]);

    return (
        <svg ref={svgRef} id="NodeMap"></svg>
    );
};


export default NodeMap;