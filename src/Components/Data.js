import React, { Component } from 'react';
import { connect } from 'react-redux';

class Data extends Component {
  componentDidMount() {
    const typeOfCases = ['confirmed', 'deaths', 'recovered'];
    let dashboardTimeline = {
      confirmed: [],
      deaths: [],
      recovered: []
    };
    let uniqueNames = {
      confirmed: [],
      deaths: [],
      recovered: []
    };
    let allTimelineCases = {
      confirmed: [],
      deaths: [],
      recovered: []
    };
    let csvData = {};
    typeOfCases.forEach((type, typeIdx) => {
      fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${type}_global.csv`)
        .then(res => res.text())
        .then(text => {
          
          csvData[`${type}`] = text;

          let allTextLines = text.split(/\r\n|\n/);
          let headers = allTextLines[0].split(',');
          const date = headers.slice(4, headers.length)
          this.props.setDate(date)
  
          let data;
          for(let i=1; i<allTextLines.length; i++){
            data = allTextLines[i].split(',');
  
            if(data.length === headers.length){
              allTimelineCases[`${type}`].push(data);    
            }
          }
          const timestamp = headers.slice(4, headers.length);
          this.props.setTimestamp(timestamp);
  
          uniqueNames[`${type}`].push(...allTimelineCases[`${type}`].filter(all =>{
            return all[0] === '';
          }))
          
          let stateNames = allTimelineCases[`${type}`].filter(all =>{
            return all[0] !== '';
          });

          stateNames.forEach(element=>{
            let state = dashboardTimeline[`${type}`].find(computedState =>{
              return computedState[1] === element[1];
            })
            if(state === undefined){
              dashboardTimeline[`${type}`].push([...element])
            } else {
              for(let i=4; i<element.length; i++){
                state[i] = parseInt(state[i]) + 0;
                state[i] += parseInt(element[i])
              }           
            }
          })
          dashboardTimeline[`${type}`].push(...uniqueNames[`${type}`])

          let timelineLength = dashboardTimeline[`${type}`][0].length;
          this.props.setTimelineLength(timelineLength)
          setTimeout(()=>{
            dashboardTimeline[`${type}`].sort(function(a, b){
              return b[timelineLength-1] - a[timelineLength-1];
            });
          },700)
          setTimeout(()=>{
            this.props.setDashboardTimeline(dashboardTimeline)
          }, 800);
          
          if (typeIdx === typeOfCases.length-1) {
            setTimeout(()=>{
              this.props.addTimelineCases(allTimelineCases);
            }, 600);
          }
        })
        .catch(() => this.setState({ hasErrors: true }));
      });

        fetch("https://covid19.mathdro.id/api/confirmed")
        .then(res => res.json())
        .then(res => {
          let uniqueNames = res.filter(re => {
            return re.provinceState === null;
          })
          let stateNames = res.filter(re => {
            return re.provinceState !== null;
          })
          let computedStates = [];
          stateNames.forEach((element)=>{
            let state = computedStates.find((computedState)=>{
              return computedState.provinceState === element.provinceState;
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
              // console.log(state)
            }
          });
          
          // values for map display
          let mapLocations = computedStates.concat(uniqueNames);
          // add mapLocations to state
          this.props.addLocations(mapLocations)
          
          let countries = [];
          computedStates.forEach((element)=>{
            let state = countries.find((country)=>{
              return country.countryRegion === element.countryRegion;
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
              return country.countryRegion === element.countryRegion;
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
        .catch(err => console.log(err));

  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    allLocations: state.allLocations,
    cases: state.cases,
    activeCumulative: state.activeCumulative,
    timelineCases: state.timelineCases,
    nowCase: state.nowCase,
    intervalId: state.intervalId,
    minRadius: state.minRadius,
    maxRadius: state.maxRadius
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date)=> { dispatch({type: 'SET_DATE', date: date})},
    addLocations: (locations) => { dispatch({type: 'ADD_LOCATIONS', locations: locations})},
    addAllLocations: (allLocations) => { dispatch({type: 'ADD_ALLLOCATIONS', allLocations: allLocations})},
    addGlobalValues: (globalValues) => { dispatch({type: 'ADD_GLOBALVALUES', globalValues: globalValues})},
    addTimelineCases: (timelineCases) => { dispatch({type: 'ADD_TIMELINECASES', timelineCases: timelineCases})},
    setDashboardTimeline: (dashboardTimeline) => { dispatch({type: 'SET_DASHBOARDTIMELINE', dashboardTimeline: dashboardTimeline})},
    setTimelineLength: (timelineLength) => { dispatch({type: 'SET_TIMELINELENGTH', timelineLength: timelineLength})},
    setTimestamp: (timestamp) => { dispatch({type: 'SET_TIMESTAMP', timestamp: timestamp})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);