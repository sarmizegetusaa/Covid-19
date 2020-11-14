import React, { Component } from 'react';
import TimelineAxis from './TimelineAxis';
import L from 'leaflet';
import * as d3 from 'd3';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

class Timeline extends Component {

  componentDidMount(){
    let intervalId = setInterval(this.timer, 150);
    this.props.addIntervalId(intervalId);
  }
  componentDidUpdate(){
    const timestamp = this.props.timestamp;
    // date for the x axis
    const lastDateEntry = timestamp[timestamp.length-1];
    let day, month, year;
    if(lastDateEntry !== undefined){
      month = lastDateEntry.slice(0,2);
      day = lastDateEntry.slice(3,5);
      year = lastDateEntry.slice(6,8);
      const lastDate = `20${year}-${month}-${day}T00:00:00`;
      this.props.setLastDate(lastDate)
    }
  }
  
  componentWillUnmount(){
    clearInterval(this.props.intervalId)
  }
  
  timer = () => {
    let timelineCasesLength;
    if(this.props.timelineCases.length === 0){
      return
    }
    if(this.props.activeTimeline === true){
      timelineCasesLength = this.props.timelineCases.confirmed[0].length;
      if(this.props.nowCase < timelineCasesLength -1 && this.props.timelineState === 'play'){
        this.props.addNowCase(this.props.nowCase +1)
      }
    }
  }
  setTimelineState = () =>{
    let stateTimeline;
    if(this.props.timelineState === 'play'){
      stateTimeline = 'stop';
      this.props.setTimelineStateReducer(stateTimeline);
    } else {
      stateTimeline = 'play';
      this.props.setTimelineStateReducer(stateTimeline);
      console.log(stateTimeline)
    }
  }
  render() {
    let cases = this.props.cases;

    return (
      <div>
        {
          ! this.props.activeCumulative ?
          (
          <div id="timestamp-watch-container">
            <div id="timestamp"></div>
          { this.props.timestamp[this.props.nowCase-4] }
        </div>) :
        null
        }
        
        {this.props.timelineCases[`${cases}`] ? (this.props.timelineCases[`${cases}`].map((location, index)=>{
          let radius = d3.scaleLinear()
            .domain([this.props.minRadius, this.props.maxRadius])
            .range([4, 30]);
          return(
              <Marker
                key={index}
                position={[
                  (location[2] !== null) ? location[2] : 0,
                  (location[3] !== null) ? location[3] : 0,
                ]}
                icon={L.divIcon({
                  html: "",
                  className: `marker background-${this.props.cases} ${this.props.activeTimeline.toString()}`,
                  iconSize: L.point(parseInt(radius(location[this.props.nowCase])), parseInt(radius(location[this.props.nowCase])), true)
                })}
                >
                <Popup>
                  <div id='popup' className={this.props.activeTimeline.toString()}>
                    {(location[0] !== undefined ) ? location[0] : null} {location[1]}
                    <br/>
                    { 
                      cases === 'confirmed' ? 
                      (<div>Confirmed: <span className='confirmed'>{d3.format(',')(location[this.props.nowCase])}</span></div>) :
                      null
                    }
                    {
                      cases === 'deaths' ?
                      (<div>Deaths: <span className='deaths'>{d3.format(',')(location[this.props.nowCase])}</span></div>) :
                      null
                    }             
                   { 
                    cases === 'recovered' ?
                    (<div>Recovered: <span className='recovered'>{d3.format(',')(location[this.props.nowCase])}</span></div>) :
                    null
                   }
                  </div>
                </Popup>
              </Marker>
          )
          })) : null
        }
        {!this.props.activeCumulative ? (
        <div id="timeline-container">
          <TimelineAxis/>
          <button id="play-stop-btn" onClick={this.setTimelineState}>
            <img className='play-stop-timeline-btn' src={this.props.timelineState === 'play' ? '/img/pause.svg' : '/img/play-btn.svg'} alt="btn-play-stop"></img>
          </button>
        </div>
        ): null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    cases: state.cases,
    activeCumulative: state.activeCumulative,
    activeTimeline: state.activeTimeline,
    timelineCases: state.timelineCases,
    nowCase: state.nowCase,
    intervalId: state.intervalId,
    minRadius: state.minRadius,
    maxRadius: state.maxRadius,
    timestamp: state.timestamp,
    timelineLength: state.timelineLength,
    timelineState: state.timelineState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNowCase: (nowCase) => { dispatch({type: 'ADD_NOWCASE', nowCase: nowCase})},
    addIntervalId: (intervalId) => { dispatch({type: 'ADD_INTERVALID', intervalId: intervalId})},
    setTimelineStateReducer: (stateTimeline) => { dispatch({type: 'SET_TIMELINESTATE', stateTimeline: stateTimeline})},
    setLastDate: (lastDate) => { dispatch({type: 'SET_LASTDATE', lastDate: lastDate})}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Timeline)