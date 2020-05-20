import React, { Component } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

class CumulativeCases extends Component {
  render() {
    return (
      <div>
        {this.props.locations.map((location, index)=>{
            const radiusC = this.props.cases;
            let radius = d3.scaleLinear()
              .domain([this.props.minRadius, this.props.maxRadius])
              .range([7, 70]);
              
            return (
              <Marker
                key={index}
                position={[
                  (location.lat !== null) ? location.lat : 0,
                  (location.long !== null) ? location.long : 0,
                ]}
                icon={L.divIcon({
                  html: "",
                  className: `marker background-${this.props.cases} ${this.props.activeCumulative}`,
                  iconSize: L.point(parseInt(radius(location[radiusC])), parseInt(radius(location[radiusC])), true)
                })}
                >
                <Popup>
                  <div id='popup' className={this.props.activeCumulative}>
                    {(location.provinceState !== null )? location.provinceState : null} {location.countryRegion}
                    <br/>
                    <div>Confirmed: <span className='confirmed'>{d3.format(',')(location.confirmed)}</span></div>
                    <div>Deaths: <span className='deaths'>{d3.format(',')(location.deaths)}</span></div>
                    <div>Recovered: <span className='recovered'>{d3.format(',')(location.recovered)}</span></div>
                    <div>Active: <span className='active'>{d3.format(',')(location.active)}</span></div>
                  </div>
                </Popup>
              </Marker>
              )
            }) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    cases: state.cases,
    activeCumulative: state.activeCumulative,
    minRadius: state.minRadius,
    maxRadius: state.maxRadius,
  }
}

export default connect(mapStateToProps)(CumulativeCases)