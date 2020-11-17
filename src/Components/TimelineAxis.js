/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useCallback } from "react";
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
    const widthXAxis = svgRef.current.getBoundingClientRect().width;
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
      width: width,
    }

    const xAxis = svg.append("g")
      .attr("transform", `translate(0, 15)`)
      .attr("class", "axis axis--x")
      .attr("stroke-width", "2")
      .call(d3.axisBottom(x));
      
    // add label for x axis
    xAxis.append("text")
    .attr("class", "label")
    .attr("fill", "#545454")

    const timelineCursor = svg.append('rect')
    .attr('height', 40)
    .attr("class", "rect-cursor")
    .attr("transform", "translate(" + -10 + "," + -10 + ")")
    .attr('width', 2)
    .attr('stroke', '#b7b5b5')
    .attr('fill', '#b7b5b5');
    
    const xScale = d3.scaleTime()
    .domain([timeline.minX, timeline.maxX])
    .range([0, timeline.width]);

    let invX = d3.scaleTime()
    .domain([0, timeline.width])
    .range([timeline.minX, timeline.maxX]);

    const spanX = (d) => {
      return xScale(timeline.parser(d))
    };
    if(timelineState === 'play' && nowCase <= timestamp.length-1){
        timelineCursor
        .attr('x', spanX(timestamp[nowCase]));
    } else if(timelineState === 'stop'){
      timelineCursor
        .attr('x', spanX(timestamp[nowCase]));
    }

    // on click timeline find date
    function findDateIndex(_date) {
      let foundIndex = -1;
      const _dateUnix = _date.getTime();
      console.log(_date)
      timestamp.forEach((dateEl, dateIndex)=>{
        if(dateIndex === 0) return;
        dateEl = new Date(dateEl);
        if(dateEl.getTime() > _dateUnix &&
          foundIndex === -1
        ){
          foundIndex = dateIndex - 1;
        }
      });
      if (foundIndex === -1) foundIndex = 0;
      return foundIndex;
    }
    // change time 
    const changeTime =()=>{
      let computedX = d3.event.clientX;
      timelineCursor
        .attr('x', spanX(invX(computedX)));

      const seekIndex = findDateIndex(invX(computedX));
      dispatch({type:"CHANGE_NOWCASE", nowCase: seekIndex});
    }
    d3.select(".chart-timeline").on('click', changeTime);

  }, [lastDate, timelineState, timestamp, nowCase, dispatch])
  return (
    <div className="svg-container-timeline" ref={wrapperRef}>
      <svg className="chart-timeline" ref={svgRef}>SVG</svg>
    </div>
  )
}

export default TimelineAxis;
