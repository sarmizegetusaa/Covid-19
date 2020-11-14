/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";

const TimelineAxis = () => {

  const dispatch = useDispatch();
  const timelineState = useSelector(state => state.timelineState);
  const timestamp = useSelector(state => state.timestamp);
  const lastDate = useSelector(state => state.lastDate);
  const nowCase = useSelector(state => state.nowCase);
  
  const svgRef = useRef();
  const wrapperRef = useRef();
  
  useEffect(()=>{
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const svg = d3.select(svgRef.current);

    let x = d3.scaleTime()
      .domain([d3.isoParse(new Date('2020-01-22T00:00:00')), d3.isoParse(new Date(lastDate))])
      .range([ 0, width ]);

    // selects chart and removes everything
    svg.selectAll("*").remove();
    const timeline = {
      parser: d3.isoParse,
      minX: d3.isoParse(new Date('2020-01-22T00:00:00')),
      maxX: d3.isoParse(new Date(lastDate)),
      width: width - 10,
    }

    const xAxis = svg.append("g")
      // .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
      
      // add label for x axis
      xAxis.append("text")
      .attr("class", "label")
      .attr("fill", "#545454")
      .attr("y", 30)
      .attr("x", width/2);
  
      const timelineCursor = svg.append('rect')
      .attr('height', 40)
      .attr("class", "rect-cursor")
      .attr("transform", "translate(" + 0 + "," + 30 + ")")
      .attr('width', 2)
      .attr('stroke', '#ccc')
      .attr('fill', '#85b7d1');
      
      const xScale = d3.scaleTime()
      .domain([timeline.minX, timeline.maxX])
      .range([20, timeline.width])

      const spanX = (d) => {
        return xScale(timeline.parser(d))
      };
      if(timelineState === 'play' && nowCase <= timestamp.length-1){
          timelineCursor
          .attr('x', spanX(timestamp[nowCase]));
      } else {
        timelineCursor
          .attr('x', spanX(timestamp[nowCase]));
      }

  }, [lastDate, timelineState, timestamp, nowCase])
  return (
    <div className="svg-container-timeline" ref={wrapperRef}>
      <svg className="chart-timeline" ref={svgRef}>SVG</svg>
    </div>
  )
}

export default TimelineAxis;
