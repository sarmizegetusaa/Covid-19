import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  handleChangeConfirm = () =>{
    const cases = 'confirmed'
    this.props.onChangeButton(cases)
  }
  handleChangeActive = () =>{
    const cases = 'active'
    this.props.onChangeButton(cases)
  }
  handleChangeRecovered = () =>{
    const cases = 'recovered'
    this.props.onChangeButton(cases)
  }
  handleChangeDeaths = () =>{
    const cases = 'deaths'
    this.props.onChangeButton(cases)
  }
  render() {
    const casesC = this.props.cases;
    const confirmedLocations = this.props.allLocations.sort(function(a, b){
      return b[casesC] - a[casesC];
    });
    return (
      <div className='dashboard'>
        <div id="header-statistics">
        <div id="type-cases">{casesC.charAt(0).toUpperCase() + casesC.slice(1)}</div>
          <div id="number-cases"></div>
        </div>
      
        <ul>
          {confirmedLocations.map((location, idx)=>{
            return (<li key={idx}><span className={casesC}>{location[casesC]}</span> {location.countryRegion}</li>)
          })}
        </ul>
        <div id="cases-btns" className="cases-btns">
          <button className="confirmed-btn btn" onClick={this.handleChangeConfirm}>Confirmed</button>
          <button className="active-btn btn" onClick={this.handleChangeActive}>Active</button>
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
    cases: state.cases
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeButton: (cases) => { dispatch({type: 'CHNAGE_CASES', cases: cases})}    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);