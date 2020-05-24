import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { rollup, groups } from 'd3-array';
import { useSelector } from "react-redux";
import Aos from 'aos';
import 'aos/dist/aos.css';
import ChartFirstPage from './ChartFirstPage';
import useResizeObserver from "../utils/useResizeObserver";

const Barchart = () => {

  let dashboardTimeline = useSelector(state => state.dashboardTimeline);
  let date = useSelector(state => state.date);
  let dataArr = [];

  const svgRef = useRef();
  const wrapperRef = useRef();
  // const dimensions = useResizeObserver(wrapperRef);

  const [cases, setState ] = useState('');
  const [ hide, hideChartFirstPage ] = useState('')
  const [ show, showBarChartTitle ] = useState('')

  useEffect(()=>{
    if(dashboardTimeline.length === 0){
      return
    }
    function startChart(cases) {
      d3.select('#cases-btns').style('opacity', '0')

      hideChartFirstPage('hide-component');
      showBarChartTitle('show-component');
      console.log(show)
      dashboardTimeline[`${cases}`].forEach((array, index)=>{
        date.forEach((dat, idx) =>{
          let obj = {
            date: new Date(dat),
            name: array[1],
            value: parseInt(array[idx+4])
          }
          dataArr.push(obj)
        })
      })

      const checkChart = d3.select('#axis-group')['_groups'][0];

      if(checkChart[0] !== null){
        d3.select(".chart").html("");
      }

      const names = new Set(dataArr.map(d => d.name));

      const dateValues = Array.from(rollup(dataArr, ([d]) => d.value, d => +d.date, d => d.name))
      .map(([date, dataArr]) => [new Date(date), dataArr])
      .sort(([a], [b]) => d3.ascending(a, b));
      
      const n = 12;
      function rank(value) {
        const data = Array.from(names, name => ({name, value: value(name)}));
        data.sort((a, b) => d3.descending(a.value, b.value));
        for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
        return data;
      }

      const k = 2;
      const keyframes = [];
      let ka, a, kb, b;
      for ([[ka, a], [kb, b]] of d3.pairs(dateValues)) {
        for (let i = 0; i < k; ++i) {
          const t = i / k;
          keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
          ]);
        }
      }
      keyframes.push([ (kb), rank(name => b.get(name) || 0)]);

      const nameframes = groups(keyframes.flatMap(([, data]) => data), d => d.name);
      const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
      const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))
      
      
      const duration = 250;

      // useEffect(()=>{
        const svg = d3.select(svgRef.current);        
        const margin = ({top: 16, right: 6, bottom: 6, left: 0});
        const barSize = 48;
        const height = margin.top + barSize * n + margin.bottom;
        const width = 1000;

        const transition = svg.transition()
            .duration(duration)
            .ease(d3.easeLinear);

        const y = d3.scaleBand()
        .domain(d3.range(n + 1))
        .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
        .padding(0.1);

        const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);

        const color ={
          "confirmed": "#a74222",
          "recovered": "#244624",
          "deaths": "#712424"
        }

        function bars(svg){
          d3.select('#bar-group').style("display", "none")
          let bar = svg.append("g")
              .attr("fill-opacity", 1)
              .attr("id", "bar-group")
              .selectAll("rect");

          return ([date, dataArr]) => bar = bar
            .data(dataArr.slice(0, n), d => d.name)
            .join(
              enter => enter.append("rect")
                .attr("fill", color[`${cases}`])
                .attr("opacity", 1)
                .attr("height", y.bandwidth())
                .attr("x", x(0))
                .attr("y", d => y((prev.get(d) || d).rank))
                .attr("width", d => x((prev.get(d) || d).value) - x(0)),
              update => update,
              exit => exit.transition(transition).remove()
                .attr("y", d => y((next.get(d) || d).rank))
                .attr("width", d => x((next.get(d) || d).value) - x(0))
            )
            .call(bar => bar.transition(transition)
              .attr("y", d => y(d.rank))
              .attr("width", d => x(d.value) - x(0)));
        }

        function labels(svg) {
            let label = svg.append("g")
            .style("font", "bold 10px var(--sans-serif)")
            .attr("fill", "#fff")
            .attr("id", "label-group")
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .selectAll("text");

          return ([date, dataArr], transition) => label = label
          .attr('id', 'label-group')
          .data(dataArr.slice(0, n), d => d.name)
          .join(
            enter => enter.append("text")
            .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
            .attr("y", y.bandwidth() / 2)
            .attr("x", -6)
            .attr("dy", "-0.25em")
            .text(d =>  d.name)
            .call(text => text.append("tspan")
            .attr("fill-opacity", 1)
            .attr("font-weight", "normal")
            .attr("x", -6)
            .attr("dy", "1.15em")),
            update => update,
            exit => exit.transition(transition).remove()
            .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
            .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
            )
            .call(bar => bar.transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))));
        }

        const formatNumber = d3.format(",d");

        function textTween(a, b) {
          const i = d3.interpolateNumber(a, b);
          return function(t) {
            this.textContent = formatNumber(i(t));
          };
        }

        const formatDate = d3.utcFormat("%B %d, %Y");

        function axis(svg) {
          let g = d3.select('#axis-group');
          if(g.node() == null){
            g = svg.append("g")
                .attr("fill", "#fff")
                .attr('id', 'axis-group')
                .attr("transform", `translate(0,${margin.top})`);
          }
          const axis = d3.axisTop(x)
              .ticks(width / 160)
              .tickSizeOuter(0)
              .tickSizeInner(-barSize * (n + y.padding()));     
              return (_, transition) => {
                g.transition(transition).call(axis)
                g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#222");
                g.selectAll(".tick:first-of-type text").remove()
                g.select(".domain").remove();
                transition.end().then(() => { })
                  .catch((err)=>console.log(err))
              };
        }        
        
        function ticker(svg) {
          let now = d3.select('#ticker-group');
          if(now.node() == null){
            now = svg.append("text")
            .style("font", `bold ${barSize}px var(--sans-serif)`)
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .attr("id", "ticker-group")
            .attr("x", width - 6)
            .attr("y", margin.top + barSize * (n - 0.45))
            .attr("dy", "0.32em")
            .attr("fill", "#fff")
            .text(formatDate(keyframes[0][0]));
          }
          
          return ([date], transition) => {
            transition.end().then(() => { now.text(formatDate(date))})
            .catch((err)=>console.log(err))
            
            let dt = new Date();
            if(formatDate(date) == formatDate(dt.setDate(dt.getDate() - 2))){
              d3.select('#cases-btns').style('opacity', '1')
            }
          };
        }

       const startC = async function chart(){
         
         const svg = d3.select(svgRef.current);
         const updateAxis = axis(svg);
         const updateBars = bars(svg);
         const updateLabels = labels(svg);
         const updateTicker = ticker(svg);
         
          for (const keyframe of keyframes) {
            const transition = svg.transition()
                .duration(duration)
                .ease(d3.easeLinear);

            x.domain([0, keyframe[1][0].value]);
            
            updateAxis(keyframe, transition);
            updateBars(keyframe, transition);
            updateLabels(keyframe, transition);
            updateTicker(keyframe, transition);
          
            // invalidation.then(() => svg.interrupt());
            await transition.end();
          }
        }
      startC();
    }
    if(cases === ''){
      return
    } else {
      startChart(cases)
    }
  }, [cases, dashboardTimeline, dataArr, date]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <React.Fragment>
      <div className="chart-container">
        <div className="svg-container">
          <p className={"barchart-title " + show}>{capitalizeFirstLetter(cases)} cases</p>
          <svg className="chart" ref={svgRef}></svg>
          <ChartFirstPage props={hide}/>
          <div 
            id="cases-btns" 
            className="cases-btns"
            style={{borderTop: "none",
                    width: "1000px",
                    margin: "0 auto",
                    textAlign: "end"
                  }}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            <button 
              style={{ width: "10%" }} 
              className="confirmed-btn btn" 
              onClick={() => setState('confirmed')}>Confirmed
            </button>
            <button 
              style={{ width: "10%" }}
              className="recovered-btn btn" 
              onClick={() => setState('recovered')}>Recovered
            </button>
            <button 
              className="deaths-btn btn"
              style={{ width: "10%" }}
              onClick={() => setState('deaths')}>Deaths
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Barchart;