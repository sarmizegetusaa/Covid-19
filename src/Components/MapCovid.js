import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import Timeline from './Timeline';
import CumulativeCases from './CumulativeCases';

class MapCovid extends Component{
  componentDidMount(){
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
      <div className='map-container'>
        <Map className='map' center={[0, 0]} zoom={3}>
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
          <CumulativeCases />
          <Timeline />
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