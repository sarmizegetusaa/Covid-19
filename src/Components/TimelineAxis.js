/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";

const TimelineAxis = () => {

  const dispatch = useDispatch();
  // let timelineState = useSelector(state => state.timelineState);
  const lastDate = useSelector(state => state.lastDate);
  
  const svgRef = useRef();
  const wrapperRef = useRef();
  
  useEffect(()=>{
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const svg = d3.select(svgRef.current);
    console.log(lastDate)
    

    let x = d3.scaleTime()
      .domain([d3.isoParse(new Date('2020-01-22T00:00:00')), d3.isoParse(new Date(lastDate))])
      .range([ 0, width ]);

    // selects chart and removes everything
    svg.selectAll("*").remove();

    const xAxis = svg.append("g")
      // .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // add label for x axis
    xAxis.append("text")
    .attr("class", "label")
    .attr("fill", "#545454")
    .attr("y", 30)
    .attr("x", width/2)
    .text("Date");
  }, [lastDate])
  return (
    <div className="svg-container-timeline" ref={wrapperRef}>
      <svg className="chart-timeline" ref={svgRef}>SVG</svg>
    </div>
  )
}

export default TimelineAxis;
