import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
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
  
  render() {
    // return(<div>bla</div>)
    let casesC = this.props.cases;
    const confirmedLocations = this.props.allLocations.sort(function(a, b){
      return b[casesC] - a[casesC];
    });
    const length = this.props.timelineLength;
    // const timelineCases = this.props.dashboardTimeline[`${casesC}`].sort(function(a, b){
    //   return b[length-1] - a[length-1];
    // });
    // const timelineCases = this.props.dashboardTimeline[`${casesC}`];
    let timelineCases = []
    setTimeout(()=>{
      timelineCases = this.props.dashboardTimeline[`${casesC}`].sort(function(a, b){
      return b[length-1] - a[length-1];
    });

    // console.log(timelineCases)
    timelineCases.forEach(location =>{
        // total += parseInt(location[this.props.nowCase])
        console.log(location[1])
    })
    }, 500)
    // console.log(casesC)

    let total = 0;

      return (
      <div className='dashboard'>
        <div id="header-statistics">
        <div id="type-cases">{casesC.charAt(0).toUpperCase() + casesC.slice(1)}</div>
          <div id="number-cases" className={casesC}>
            { this.props.activeCumulative ? 
            (this.props.globalValues[casesC]) :
             (setTimeout(()=>{
              return (total)
             },500))}
            
          </div>
        </div>
      
        <ul>
          { this.props.activeCumulative ? (
            confirmedLocations.map((location, idx)=>{
            return (<li key={idx}><span className={casesC}>{location[casesC]}</span> {location.countryRegion}</li>)
          })) : (
            this.props.dashboardTimeline[`${casesC}`].map((location, idx)=>{
            return (<li key={idx}><span className={casesC}>{location[1]}</span> {location[this.props.nowCase]}</li>)
            })
          )}
        </ul>
        <div id="cases-btns" className="cases-btns">
          <button className="confirmed-btn btn" onClick={this.handleChangeConfirm}>Confirmed</button>
          {this.props.activeCumulative ? ( <button className="active-btn btn" onClick={this.handleChangeActive}>Active</button>) : null}
          <button className="recovered-btn btn" onClick={this.handleChangeRecovered}>Recovered</button>
          <button className="deaths-btn btn" onClick={this.handleChangeDeaths}>Deaths</button>
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