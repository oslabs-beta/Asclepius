import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as d3 from 'd3';
import { setData, setSidebarData } from '../redux/slices/nodeSlice.js';



function NodeMap() {
  const dispatch = useDispatch()
  const nodeData = useSelector((state) => state.node.clusterName)

  const data = useSelector((state) => state.node.nodes);
  const sidebarData = useSelector((state) => state.node.sidebarData);
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

  console.log(nodes);
  nodes.unshift({ id: 0, name: 'Master Node', color: 'grey' });

  const links = nodes
    .slice(1)
    .map((node) => ({ source: nodes[0], target: node.id }));


  // console.log("This is links:", links);

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
    const scale = Math.min(70, 280 / nodes.length);
    const maxFontSize = scale * 0.8;
    // Create nodes
    const node = group
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', scale)
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
      label.style('font-size', () => {
        return Math.min(maxFontSize, 10);
      })
    }
  }, [nodes, links, dispatch]);

  return (
    <div id='innerNodeMapContainer'>
      <svg ref={svgRef} id='NodeMap'></svg>
    </div>
  );
}

export default NodeMap;
