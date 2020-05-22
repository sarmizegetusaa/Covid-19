import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import Timeline from './Timeline';
import CumulativeCases from './CumulativeCases';

class MapCovid extends Component{
  
  componentDidUpdate(){      
    let arrayOfCases = [];
    this.props.locations.map(location => {
      let radiusC = this.props.cases;
      arrayOfCases.push(location[radiusC]);
    })
    const minRadius = Math.min.apply(Math, arrayOfCases);
    const maxRadius = Math.max.apply(Math, arrayOfCases);
    this.props.setMinRadius(minRadius);
    this.props.setMaxRadius(maxRadius);
  }
  render() {
    
    return (
      <div>
        <Map className='map' center={[0, 0]} zoom={3} >
          <TileLayer
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            // url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
            // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
          <CumulativeCases/>
          <Timeline/>
          </Map>
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    cases: state.cases,
    timelineCases: state.timelineCases
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMinRadius: (minRadius) => { dispatch({type: 'SET_MINRADIUS', minRadius: minRadius})},
    setMaxRadius: (maxRadius) => { dispatch({type: 'SET_MAXRADIUS', maxRadius: maxRadius})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCovid);