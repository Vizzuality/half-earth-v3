import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import cx from 'classnames';

import styles from './scatter-plot-styles.module.scss';

const ScatterPlot = ({
  data,
  className
}) => {

  const ref = useRef()
  var canvasWidth = 700;
  var canvasHeight = 400;
  var padding = 30;  // for chart edges

  const xScale = d3.scaleLinear()  // xScale is width of graphic
                    .domain([0, d3.max(data, function(d) {
                        return d[0];  // input domain
                    })])
                    .range([padding, canvasWidth - padding * 2]); // output range
  
const yScale = d3.scaleLinear()  // yScale is height of graphic
                    .domain([0, d3.max(data, function(d) {
                        return d[1];  // input domain
                    })])
                    .range([canvasHeight - padding, padding]);  // remember y starts on top going down so we flip
  
    // Define X axis
 const  xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(5);
  
    // Define Y axis
    const  yAxis = d3.axisLeft()
                    .scale(yScale)
                    .ticks(5);

  useEffect(() => {
    const svgElement = d3.select(ref.current);


  
    // Create scale functions
    
  
    svgElement.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")  // Add circle svg
      .attr("cx", function(d) {
          return xScale(d[0]);  // Circle's X
      })
      .attr("cy", function(d) {  // Circle's Y
        return yScale(d[1]);
      })
      .attr("r", 12)  // radius
      .attr("fill",  '#fff')
      .attr("fill-opacity",  0.6);
    // Add to X axis
    svgElement.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (canvasHeight - padding) +")")
      .call(xAxis);

    // Add to Y axis
    svgElement.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding +",0)")
      .call(yAxis);
                    

    

    // svgElement.append("circle")
    //   .attr("cx", 150)
    //   .attr("cy", 70)
    //   .attr("r",  50)
    //   .attr("fill",  '#444')




  }, []);

  const onClick = () => {
    const svgElement = d3.select(ref.current);

    var numValues = data.length;  // Get original data's length
    var maxRange = Math.random() * 1000;  // Get max range of new values
    data = [];  // Initialize empty array
    for(var i=0; i<numValues; i++) {
        var newNumber1 = Math.floor(Math.random() * maxRange);  // Random int for x
        var newNumber2 = Math.floor(Math.random() * maxRange);  // Random int for y
        data.push([newNumber1, newNumber2]);  // Add new numbers to array
    }

    // Update scale domains
    xScale.domain([0, d3.max(data, function(d) {
        return d[0]; })]);
    yScale.domain([0, d3.max(data, function(d) {
        return d[1]; })]);

    // Update circles
    svgElement.selectAll("circle")
        .data(data)  // Update with new data
        .transition()  // Transition from old to new
        .duration(1000)  // Length of animation
        .on("start", function() {  // Start animation
            d3.select(this)  // 'this' means the current element
                .attr("fill", "red")  // Change color
                .attr("r", 12)
                .attr("fill-opacity",  0.6);  // Change size
        })
        .delay(function(d, i) {
            return i / data.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
        })
        //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
        .attr("cx", function(d) {
            return xScale(d[0]);  // Circle's X
        })
        .attr("cy", function(d) {
            return yScale(d[1]);  // Circle's Y
        })
        .on("end", function() {  // End animation
            d3.select(this)  // 'this' means the current element
                .transition()
                .duration(500)
                .attr("fill", "white")  // Change color
                .attr("r", 12)
                .attr("fill-opacity",  0.6);  // Change radius
        });

        // Update X Axis
        svgElement.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        // Update Y Axis
        svgElement.select(".y.axis")
            .transition()
            .duration(100)
            .call(yAxis);
  }

  // Setup settings for graphic
  
  // Create SVG element
  // var svg = d3.select("h3")  // This is where we put our vis
  //     .append("svg")
  //     .attr("width", canvasWidth)
  //     .attr("height", canvasHeight)

  // // Create Circles
  // svg.selectAll("circle")
  //     .data(data)
  //     .enter()
  //     .append("circle")  // Add circle svg
  //     .attr("cx", function(d) {
  //         return xScale(d[0]);  // Circle's X
  //     })
  //     .attr("cy", function(d) {  // Circle's Y
  //         return yScale(d[1]);
  //     })
  //     .attr("r", 2);  // radius

  // // Add to X axis
  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + (canvasHeight - padding) +")")
  //     .call(xAxis);

  // // Add to Y axis
  // svg.append("g")
  //     .attr("class", "y axis")
  //     .attr("transform", "translate(" + padding +",0)")
  //     .call(yAxis);
  
  // // On click, update with new data
  

  return (
    <div className={cx(styles.container, className)}>
      <button className={styles.animateButton} onClick={onClick}>ANIMATE!</button>
      <svg ref={ref} width={canvasWidth} height={canvasHeight}>
      </svg>
    </div>
 
  )
}

export default ScatterPlot;