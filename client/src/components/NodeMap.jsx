import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as d3 from 'd3';
import { setData, setSidebarData } from '../redux/slices/nodeSlice.js';


function NodeMap() {
  const dispatch = useDispatch()
  const nodeData = useSelector((state) => state.node.clusterName)

  const data = useSelector((state) => state.node.nodes);
  const sidebarData = useSelector((state) => state.node.sidebarData);
  //const [nodePositions, setNodePositions] = useState(nodes.map(node => ({ x: node.x, y: node.y })));
  //shape of data:
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
    if (name === sidebarData.name || name === 'Master Node') {
      dispatch(setSidebarData({}));
    } else {
      const sbData = data.find((el) => el.name === name);
      console.log('pre-dispatch sbData', sbData);
      dispatch(setSidebarData(sbData));
    }
  };

  useEffect(() => {
    setInterval(() => {
      console.log('firing fetch in setTimeout');

      fetch(`http://localhost:3000/getData`)
        .then((data) => data.json())
        .then((data) => {
          console.log('this is the data I need: ', data);
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
  nodes.unshift({ id: 0, name: 'Master Node', color: 'grey' });

  const links = nodes
    .slice(1)
    .map((node) => ({ source: nodes[0], target: node.id }));

//   const nodes = [
//     { id: 0, name: 'Node 0'},
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

  const width = 200;
  const height = 200;

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('height', height)
      .attr('width', width);

    const group = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + width / 1.25 + ',' + 500 + ')rotate(-70)'
      );


    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(300)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(height, width / 2))
      .on('tick', ticked);

    const link = group
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', 'black')
      .attr('opacity', 1);


    //changes the radius of nodes depending on number of nodes rendered
    const scale = Math.min(70, 7000 / nodes.length);
    const maxFontSize = scale * 0.6;
    // Create nodes
    const node = group
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', scale)
      .style('stroke', 'black')
      .attr('fill', (d) => d.color)
      .on('click', function (event, d) {
        //call helper function
        //d.id should be a string node name
        setSidebar(d.name);
        // console.log("nodewas clicked", d.name)
      });
    const label = group
      .selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Play, sans-serif')
      .style('font-size', () => {
        return Math.min(maxFontSize, 10);
      })
      .text((d) => d.name);

//       nodes.forEach((d, i) => {
//   const labelNode = label.nodes([i]);
//   d.label = labelNode; 
// });

    function ticked() {

      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      label.attr('x', (d) => d.x).attr('y', (d) => d.y);
      label.attr('transform', (d) => `rotate(70, ${d.x}, ${d.y})`)
    }
  }, [nodes, links, dispatch]);//positions

  return (
    <div id='innerNodeMapContainer'>
      <svg ref={svgRef} id='NodeMap'></svg>
    </div>
  );
}

export default NodeMap;
