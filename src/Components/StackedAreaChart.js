import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import useResizeObserver from "../utils/useResizeObserver";

const StackedAreaChart = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);;
  const globalValues = useSelector(state => state.globalValues);
  let timelineCases = useSelector(state => state.timelineCases);
  let timelinecasesloaded = useSelector(state => state.timelineCasesLoaded);
  let timestamp = useSelector(state => state.timestamp);
  
  useEffect(() => {
    const { width, height } =
    dimensions || wrapperRef.current.getBoundingClientRect()
    const arrayCases = ["confirmed", "recovered", "deaths"];
    let colorsArray = ["#ad4828", "#244624", "#712424"];
    const numberCases = [0, 1, 2];
    let computedData = [];

    timestamp.forEach((date, index)=>{
      arrayCases.forEach((typeCase)=>{
        timelineCases[`${typeCase}`].forEach((cases, idx)=>{
          
          let record = computedData.find(domain => {
            return domain.dateStr === date && domain.case === typeCase;
          });
          
          if(cases[index+4] !== undefined){
            if(record === undefined){
              computedData.push({
                case: typeCase,
                xValue: Date.parse(date),
                dateObj: new Date(date),
                dateStr: date,
                yValue: parseInt(cases[index+4])
              })
            } else {
              record.yValue += parseInt(cases[index+4])
            }
          }
        })
      })
    });
  
    if (computedData.length === 0) {
      return;
    }

    const sumstat = d3.nest()
          .key(function(d) {
            return d.xValue
          })
          .entries(computedData);

    const stackedData = d3.stack()
    .keys(numberCases)
    .value(function(d, key) {
      if (d.values[key] === undefined) {
      }
      return d.values[key].yValue;
    })
    (sumstat);

    const svg = d3.select(svgRef.current);

    let x = d3.scaleUtc()
        .domain([computedData[0].dateObj, computedData[computedData.length-1].dateObj])
        .range([ 0, width ]);

    // selects chart and removes everything
    svg.selectAll("*").remove();

    const xAxis = svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(6))
        // .tickSize(-height)
        // .tickPadding(15));

      // add label for x axis
      xAxis.append("text")
      .attr("class", "label")
      .attr("fill", "#545454")
      .attr("y", 30)
      .attr("x", width/2)
      .text("Date");

      let maxYDomain = globalValues.confirmed + globalValues.deaths + globalValues.recovered;

      const yAxisTickFormat = number => 
      d3.format('.1s')(number)
      .replace('G', 'M')
    
      const y = d3.scaleLinear()
        .domain([0, maxYDomain ])
        .range([ height, 0 ]);
      const yAxis = svg.append("g")
        .call(d3.axisLeft(y).ticks(7)
        .tickFormat(yAxisTickFormat))
        // .tickSize(-width)
        // .tickPadding(5));

      // add label for y axis
      yAxis.append("text")
      .attr("class", "label")
      .attr("fill", "#545454")
      .attr("y", -30)
      .attr("x", -height/2)
      .attr("transform", `rotate(-90)`)
      .style("text-anchor", "middle")
      .text("Number of cases");

      // color palette
      const color = d3.scaleOrdinal()
        .domain(arrayCases)
        .range(colorsArray);

      // Add Brushing
      // clip path so the chart will not overflow
      svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0)
        
      const brush = d3.brushX()
        .extent([[0,0], [width, height]])
        .on("end", updateChart);

      // Create the scatter variable: where both the circles and the brush take place
      const areaChart = svg.append("g")
        .attr("clip-path", "url(#clip)");
      
      areaChart.append("g")
        .attr("class", "brush")
        .call(brush);

      const area = d3.area()
        .x(function(d) { 
          return x(d.data.values[0].dateObj)
        })
        .y0(function(d) {
          return y(d[0])
        })
        .y1(function(d) { 
          return y(d[1])
        });

      const div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

      areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
          .attr("class", function(d) {
            return "myArea " + d.key })
          .attr("data-key", function(d) { return d.key; })
          .style("fill", function(d) {
            return color(d.key);
          })
          .attr("d", area)
          .on("mousemove", function(dataSet) {

            let currentElement = x.invert(d3.mouse(this)[0]);
            let currentElementString = String(currentElement).slice(0,15);

            let popupElements = currentElementString.slice(3,15) + "<br />";
            dataSet.forEach((data)=>{
              if(String(data.data.values[0].dateObj).slice(0,15) === currentElementString){
                data.data.values.forEach(value => {
                  popupElements += `<span class="tooltip"></span>${(value.case).charAt(0).toUpperCase() + (value.case).slice(1)}: ${d3.format(',')(value.yValue)}<br />`;
                })
              }
            })
            div.transition()		
              .duration(200)
              .style("display", "block")	
              .style("opacity", .9);

            div.html(popupElements)	
              .style("left", (d3.event.pageX - 70) + "px")		
              .style("top", (d3.event.pageY - 120) + "px");
          })
          .on("mouseleave", function(d) {
            div.transition()		
                .duration(500)		
                .style("display", "none");	
          });

      let idleTimeout;
      function idled() { idleTimeout = null; }

      // Update the chart for given boundaries
      function updateChart() {
        const extent = d3.event.selection;
        
        if(!extent) {
          if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
          x.domain(d3.extent(computedData, function(d) {
            return d.dateObj }))
        } else {
          x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
          areaChart.select(".brush").call(brush.move, null)
        }

        // Update axis and area position
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(6))
        areaChart
          .selectAll("path")
          .transition().duration(1000)
          .attr("d", area)
      }

  }, [dimensions, timelinecasesloaded])

  return (
    <React.Fragment>
    <div className="stacked-chart-container">
      <p className="title-stacked-chart">Covid-19 Cases</p>
      <div className="svg-stacked-container" ref={wrapperRef}>
        <svg className="stacked-chart" ref={svgRef}></svg>
      </div>
    </div>
  </React.Fragment>
  )
}

export default StackedAreaChart;