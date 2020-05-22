import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

class Dashboard extends Component {

  state = {
    border:{
      "confirmed": "1px solid #ad4828",
      "recovered": "1px solid #244624",
      "active": "1px solid #5c5c39",
      "deaths": "1px solid #712424",
    },
    borderTop:{
      "confirmed": "5px solid #ad4828",
      "recovered": "5px solid #244624",
      "active": "5px solid #5c5c39",
      "deaths": "5px solid #712424",
    }
  }

  handleChangeConfirm = () =>{
    const cases = 'confirmed';
    this.props.onChangeButton(cases);
    this.props.addNowCase(3);
  }
  handleChangeActive = () =>{
    const cases = 'active';
    this.props.onChangeButton(cases);
    this.props.addNowCase(3);
  }
  handleChangeRecovered = () =>{
    const cases = 'recovered';
    this.props.onChangeButton(cases);
    this.props.addNowCase(3);
  }
  handleChangeDeaths = () =>{
    const cases = 'deaths';
    this.props.onChangeButton(cases);
    this.props.addNowCase(3);
  }
  totalDashboad = (casesC) => {
    if(this.props.dashboardTimeline.length === 0){
      return;
    }
    const dashCases = this.props.dashboardTimeline[casesC];
    if (dashCases) {
      return dashCases.reduce((accumulator, currentVal) => {
        return accumulator + +currentVal[this.props.nowCase];
      }, 0);
    }
    return 0;
  }
  
  render() {
    let casesC = this.props.cases;
    const confirmedLocations = this.props.allLocations.sort(function(a, b){
      return b[casesC] - a[casesC];
    });

    let totalTimelineCases = this.totalDashboad(casesC);

      return (
      <div className='dashboard'>
        <div 
          id="header-statistics"
          style={{border: this.state.border[`${casesC}`]}}
        >
        <div id="type-cases">{casesC.charAt(0).toUpperCase() + casesC.slice(1)}</div>
          <div 
            id="number-cases" 
            className={casesC}
          >
            { this.props.activeCumulative ? 
              d3.format(',')(this.props.globalValues[casesC]) :
              d3.format(',')(totalTimelineCases)
            }
          </div>
        </div>
      
        <ul style={{border: this.state.border[`${casesC}`]}}>
          { this.props.activeCumulative ?(
            confirmedLocations.map((location, idx)=>{
            return (<li key={idx}><span className={casesC}>{d3.format(',')(location[casesC])}</span> {location.countryRegion}</li>)
          })) : (
            this.props.dashboardTimeline ?
            (this.props.dashboardTimeline[`${casesC}`].map((location, idx)=>{
            return (<li key={idx}><span className={casesC}>{ d3.format(',')(location[this.props.nowCase])}</span> {location[1]}</li>)
            })) : null
          )}
        </ul>
        <div 
          id="cases-btns"  
          className="cases-btns"
          style={{borderTop: this.state.borderTop[`${casesC}`]}}
        >
          <button 
            className={casesC === 'confirmed' ? "btn " + casesC + "-btn" : "btn"}
            onClick={this.handleChangeConfirm}>Confirmed
          </button>
          {this.props.activeCumulative ? 
            ( <button 
                className={casesC === 'active' ? "btn " + casesC + "-btn" : "btn"}
                onClick={this.handleChangeActive}>Active
                </button>) 
            : (null)
          }
          <button 
            className={casesC === 'recovered' ? "btn " + casesC + "-btn" : "btn"}
            onClick={this.handleChangeRecovered}>Recovered
            </button>
          <button 
            className={casesC === 'deaths' ? "btn " + casesC + "-btn" : "btn"}
            onClick={this.handleChangeDeaths}>Deaths
            </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    allLocations: state.allLocations,
    cases: state.cases,
    globalValues: state.globalValues,
    activeCumulative: state.activeCumulative,
    dashboardTimeline: state.dashboardTimeline,
    timelineLength : state.timelineLength,
    nowCase: state.nowCase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeButton: (cases) => { dispatch({type: 'CHNAGE_CASES', cases: cases})},
    addNowCase: (nowCase) => { dispatch({type: 'ADD_NOWCASE', nowCase: nowCase})},   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);