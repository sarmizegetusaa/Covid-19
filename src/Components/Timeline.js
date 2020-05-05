import React, { Component } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

class Timeline extends Component {

  componentDidMount(){
    let intervalId = setInterval(this.timer, 100);
    this.props.addIntervalId(intervalId);
  }

  componentWillUnmount(){
    clearInterval(this.props.intervalId)
  }

  timer = () => {
    let timelineCasesLength;

    setTimeout(()=>{
      timelineCasesLength = this.props.timelineCases.confirmed[0].length;
      if(this.props.nowCase < timelineCasesLength -1){
        this.props.addNowCase(this.props.nowCase +1)
      }
    }, 500)

  }
  render() {
    let cases = this.props.cases;
    return (
      <div>
        {
          ! this.props.activeCumulative ?
          (<div id='timestamp'>
          { this.props.timestamp[this.props.nowCase-4] }
        </div>) :
        null
        }
        
        {this.props.timelineCases[`${cases}`] ? (this.props.timelineCases[`${cases}`].map((location, index)=>{
          let radius = d3.scaleLinear()
            .domain([this.props.minRadius, this.props.maxRadius])
            .range([4, 60]);
          return(
              <Marker
                key={index}
                position={[
                  (location[2] !== null) ? location[2] : 0,
                  (location[3] !== null) ? location[3] : 0,
                ]}
                icon={L.divIcon({
                  html: "",
                  className: `marker background-${this.props.cases} ${! this.props.activeCumulative}`,
                  iconSize: L.point(parseInt(radius(location[this.props.nowCase])), parseInt(radius(location[this.props.nowCase])), true)
                })}
                >
                <Popup>
                  <div id='popup' className={!this.props.activeCumulative}>
                    {(location[0] !== undefined ) ? location[0] : null} {location[1]}
                    <br/>
                    { 
                      cases === 'confirmed' ? 
                      (<div>Confirmed: <span className='confirmed'>{location[this.props.nowCase]}</span></div>) :
                      null
                    }
                    {
                      cases === 'deaths' ?
                      (<div>Deaths: <span className='deaths'>{location[this.props.nowCase]}</span></div>) :
                      null
                    }             
                   { 
                    cases === 'recovered' ?
                    (<div>Recovered: <span className='recovered'>{location[this.props.nowCase]}</span></div>) :
                    null
                   }
                  </div>
                </Popup>
              </Marker>
          )
          })) : null
        } 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    cases: state.cases,
    activeCumulative: state.activeCumulative,
    timelineCases: state.timelineCases,
    nowCase: state.nowCase,
    intervalId: state.intervalId,
    minRadius: state.minRadius,
    maxRadius: state.maxRadius,
    timestamp: state.timestamp,
    timelineLength: state.timelineLength
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNowCase: (nowCase) => { dispatch({type: 'ADD_NOWCASE', nowCase: nowCase})},
    addIntervalId: (intervalId) => { dispatch({type: 'ADD_INTERVALID', intervalId: intervalId})}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Timeline)