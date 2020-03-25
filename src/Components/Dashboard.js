import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const confirmedLocations = this.props.allLocations.sort(function(a, b){
      return b.confirmed - a.confirmed;
    });
    // const recoveredLocations = this.props.allLocations.sort(function(a, b){
    //   return b.recovered - a.recovered;
    // });
    // const deathsLocations = this.props.allLocations.sort(function(a, b){
    //   return b.deaths - a.deaths;
    // });
    // const activeLocations = this.props.allLocations.sort(function(a, b){
    //   return b.active - a.active;
    // });
    return (
      <div className='dashboard'>
        <div id="header-statistics">
        <div id="type-cases"></div>
          <div id="number-cases"></div>
        </div>
      
        <ul>
          {confirmedLocations.map((location, idx)=>{
            return (<li key={idx}>{location.confirmed} {location.countryRegion}</li>)
          })}
        </ul>
        <div id="cases-btns" className="cases-btns">
          <button className="confirmed-btn btn">Confirmed</button>
          <button className="active-btn btn">Active</button>
          <button className="recovered-btn btn">Recovered</button>
          <button className="deaths-btn btn">Deaths</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    allLocations: state.allLocations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addLocations: (locations) => { dispatch({type: 'ADD_LOCATIONS', locations: locations})},
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);