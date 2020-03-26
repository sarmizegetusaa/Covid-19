import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

class MapCovid extends Component{

  componentDidMount() {
    // fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv")
    //   .then(res => res.text())
    //   .then(text => {
    //     // data
    //     // this.setState({ locations: res })
    //     console.log(text)
    //   })
    //   .catch(() => this.setState({ hasErrors: true }));
    fetch("https://covid19.mathdro.id/api/confirmed")
      .then(res => res.json())
      .then(res => {
        let uniqueNames = res.filter(re => {
          return re.provinceState == null;
        })
        
        let stateNames = res.filter(re => {
          return re.provinceState !== null;
        })
        let computedStates = [];
        stateNames.forEach((element)=>{
          let state = computedStates.find((computedState)=>{
            return computedState.provinceState == element.provinceState;
          });
          if(state === undefined){
            computedStates.push({
              ...element
            });
          } else {
            state.confirmed += element.confirmed;
            state.recovered += element.recovered;
            state.deaths += element.deaths;
            state.active += element.active;
          }
        });
     
        // values for map display
        let mapLocations = computedStates.concat(uniqueNames);
        // add mapLocations to state
        this.props.addLocations(mapLocations)

        let countries = [];
        computedStates.forEach((element)=>{
          let state = countries.find((country)=>{
            return country.countryRegion == element.countryRegion;
          });
          if(state === undefined){
            countries.push({
              ...element
            });
          } else {
            state.confirmed += element.confirmed;
            state.recovered += element.recovered;
            state.deaths += element.deaths;
            state.active += element.active;
          }
        })
        // values for dashboard
        let allLocations = countries.concat(uniqueNames);
        let all = [];
        allLocations.forEach((element)=>{
          let state = all.find((country)=>{
            return country.countryRegion == element.countryRegion;
          });
          if(state === undefined){
            all.push({
              ...element
            });
          } else {
            state.confirmed += element.confirmed;
            state.recovered += element.recovered;
            state.deaths += element.deaths;
            state.active += element.active;
          }
        })
        // add allLocations values to state
        this.props.addAllLocations(all);
      })
      .catch(err => console.log(err));

    fetch("https://covid19.mathdro.id/api")
    .then(res=> res.json())
    .then(res => {
      let globalValues = {
        confirmed: res.confirmed.value,
        recovered: res.recovered.value,
        deaths: res.deaths.value,
        active: res.confirmed.value - (res.recovered.value + res.deaths.value)
      }
      // add global values to state
      this.props.addGlobalValues(globalValues);
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Map className='map' center={[0, 0]} zoom={3}>
          <TileLayer
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
          {this.props.locations.map((location, index)=>{
            // calc radius depending on cases
            let radiusC = this.props.cases
            let radius = parseFloat(location[radiusC]/500);
            if(radius < 2){
              radius = 7
            }
            if(radiusC === 'deaths'){
              radius = parseFloat(location[radiusC]/120);
              if(radius < 2){
                radius = 7
              }
            }
            if(radiusC === 'recovered'){
              radius = parseFloat(location[radiusC]/600);
              if(radius < 7){
                radius = 7
              }
            }
            return (
              <Marker
                key={index}
                position={[
                  location.lat,
                  location.long
                ]}
                icon={L.divIcon({
                  html: "",
                  className: `marker background-${this.props.cases}`,
                  iconSize: L.point(radius, radius, true)
                })}
                >
                <Popup>
                  <div className='popup'>
                    {(location.provinceState !== null )? location.provinceState : null} {location.countryRegion}
                    <br/>
                    <div>Confirmed: <span className='confirmed'>{location.confirmed}</span></div>
                    <div>Deaths: <span className='deaths'>{location.deaths}</span></div>
                    <div>Recovered: <span className='recovered'>{location.recovered}</span></div>
                    <div>Active: <span className='active'>{location.active}</span></div>
                  </div>
                </Popup>
              </Marker>
              )
            }) }
          </Map>
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    allLocations: state.allLocations,
    cases: state.cases
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLocations: (locations) => { dispatch({type: 'ADD_LOCATIONS', locations: locations})},
    addAllLocations: (allLocations) => { dispatch({type: 'ADD_ALLLOCATIONS', allLocations: allLocations})},
    addGlobalValues: (globalValues) => { dispatch({type: 'ADD_GLOBALVALUES', globalValues: globalValues})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCovid);