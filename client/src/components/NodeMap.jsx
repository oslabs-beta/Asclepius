import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

function NodeMap() {
    const svgRef = useRef();

    //grab the updated k8s data from state
    const stateData = useSelector((state) => state);

    const nodes = stateData.nodes.map((node) => ({ id: node.id, name: node.name}));
    const links = stateData.nodes.map((link) => ({source: "node 1", target: link.id}));

     useEffect(() => {
    //     d3.select(svgRef.current).selectAll("*").remove();
        
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        const link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link");

            const width = 600;
            const height = 300;
        

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
    // Sample data for nodes and link
    // const nodes = [
    //     { id: 1, name: 'Node 1' },
    //     { id: 2, name: 'Node 2' },
    //     { id: 3, name: 'Node 3' },
    //     { id: 4, name: 'Node 4' },
    //     { id: 5, name: 'Node 5' },
    //     { id: 6, name: 'Node 6' },
    // ];

    // const links = [
    //     { source: 1, target: 2 },
    //     { source: 1, target: 3 },
    //     { source: 1, target: 4 },
    //     { source: 1, target: 5 },
    //     { source: 1, target: 6 },
    //     { source: 2, target: 3 },
    // ];

    // Set up the SVG container dimensions
  
//     useEffect(() => {
//         // Create an SVG container
//         const svg = d3.select(svgRef.current)
//             .attr("width", width)
//             .attr("height", height);

//         // Create a force simulation
        
//         // Create links
      

//         // Add labels to nodes
//         const label = svg.selectAll(".label")
//             .data(nodes)
//             .enter().append("text")
//             .attr("class", "label")
//             .attr("dy", 4)
//             .attr("text-anchor", "middle")
//             .text(d => d.name);

//         function ticked() {
//             link
//                 .attr("x1", d => d.source.x)
//                 .attr("y1", d => d.source.y)
//                 .attr("x2", d => d.target.x)
//                 .attr("y2", d => d.target.y)

//             node
//                 .attr("cx", d => d.x)
//                 .attr("cy", d => d.y);

//             label
//                 .attr("x", d => d.x)
//                 .attr("y", d => d.y);
//         }
//     }, [nodes, links]);
//     //
//     //  // Set up tick function for simulation
//     //  simulation.on("tick", () => {
//     //     link
//     //     .attr("x1", d => d.source.x)
//     //     .attr("y1", d => d.source.y)
//     //     .attr("x2", d => d.target.x)
//     //     .attr("y2", d => d.target.y);
    
//     //     node
//     //     .attr("cx", d => d.x)
//     //     .attr("cy", d => d.y);
    
//     //     label
//     //     .attr("x", d => d.x)
//     //     .attr("y", d => d.y);
//     // });

//     return (
//         <svg ref={svgRef} id="NodeMap"></svg>
//     );
// }

export default NodeMap;