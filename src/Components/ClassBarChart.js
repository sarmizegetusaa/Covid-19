import React, { Component, useRef} from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { rollup, groups } from 'd3-array';
import BarChartButtons from './BarChartButtons';

class ClassBarChart extends Component {

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.svgRef = React.createRef();
  }
  componentDidMount(){
    let dashboardTimeline = this.props.dashboardTimeline;
    let date = this.props.date;
    let cases = this.props.cases;
    let dataArr = [];
  
    if(dashboardTimeline && dashboardTimeline.length > 1){

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
    // const keyframes =()=> {
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
      // return keyframes;
    // }

    console.log('keyframes1', keyframes)
    const nameframes = groups(keyframes.flatMap(([, data]) => data), d => d.name);
    const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
    const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))
  
    // const keyframes = this.props.keyframes;
    // const prev = this.props.prev;
    // const next = this.props.next;
    // const dataArr = this.props.dataArr
  
    const svgRef = this.svgRef
    // const wrapperRef = useRef();
    
    const duration = 250;

    // useEffect(()=>{
      // const svg = d3.select(svgRef.current);
      const svg = d3.select(svgRef.current);
      // if (!dimensions) return;
      // const chart = () =>{
        // replay;
        // const svg = d3.create("svg")
        //     .attr("viewBox", [0, 0, width, height]);
      
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

    const color = ()=> {
        const scale = d3.scaleOrdinal(d3.schemeTableau10);
        if (dataArr.some(d => d.name !== undefined)) {
          const categoryByName = new Map(dataArr.map(d => [d.name]))
          scale.domain(Array.from(categoryByName.values()));
          return d => scale(categoryByName.get(d.name));
        }
        return d => scale(d.name);
      }
    const colors = ["#aa42ae", "#008080", "#9f7a42", "#f79862", "#f24848", "#9dea4f", "#688768"];

    // console.log(dataArr)
      function bars(svg){
      //   let bar =  d3.select('#bar-group');
        // if(bar.node() == null){
        let  bar = svg.append("g")
            .attr("fill-opacity", 1)
            .selectAll("rect");
        // }

        return ([date, dataArr]) => bar = bar
          .data(dataArr.slice(0, n), d => d.name)
          .join(
            enter => enter.append("rect")
              .attr("fill", "#008080")
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
          .style("font-variant-numeric", "tabular-nums")
          .attr("text-anchor", "end")
          .selectAll("text");
        // }
        // console.log('label', label.node())
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
          // .text(d => d.name)
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
          .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))))
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
              g.transition(transition).call(axis);
              g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#222");
              g.selectAll(".tick:first-of-type text").remove()
              g.select(".domain").remove();
            };
      }
      

      function ticker(svg) {
        let now = d3.select('#ticker-group');
        if(now.node() == null){
          now = svg.append("text")
              .style("font", `bold ${barSize}px var(--sans-serif)`)
              .style("font-variant-numeric", "tabular-nums")
              .attr("text-anchor", "end")
              .attr("x", width - 6)
              .attr("y", margin.top + barSize * (n - 0.45))
              .attr("dy", "0.32em")
              .attr("fill", "#fff")
              // .text(formatDate(keyframes[0][0]));
        }
      
        return ([date], transition) => {
          transition.end().then(() => { now.text(formatDate(date))});
          // transition.end().then(() => { now.text(formatDate(date))});
        };
      }


          async function chart(){
            const svg = d3.select(svgRef.current);
            const updateAxis = axis(svg);
            const updateBars = bars(svg);
            const updateLabels = labels(svg);
            const updateTicker = ticker(svg);
          
            // yield svg.node();
            // svg.node();
          
            for (const keyframe of keyframes) {
              const transition = svg.transition()
                  .duration(duration)
                  .ease(d3.easeLinear);
          
              // Extract the top bar’s value.
              x.domain([0, keyframe[1][0].value]);
          
              updateAxis(keyframe, transition);
              updateBars(keyframe, transition);
              updateLabels(keyframe, transition);
              updateTicker(keyframe, transition);
          
              // invalidation.then(() => svg.interrupt());
              await transition.end();
            }
          }
       
          chart();
  }

  render(){
   
    return (
      <React.Fragment>
        {/* <Test/> */}
        <div className="chart-container">
          <div className="svg-container" >
            <svg className="chart" ref={this.svgRef}></svg>
          </div>
        </div>
        <BarChartButtons/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dashboardTimeline: state.dashboardTimeline,
    date: state.date,
    keyframes: state.keyframes,
    prev: state.prev,
    next: state.next,
    dataArr: state.dataArr,
    cases: state.cases
  }
}


export default connect(mapStateToProps)(ClassBarChart);