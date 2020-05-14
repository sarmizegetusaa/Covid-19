import React, { Component } from 'react';
import { connect } from 'react-redux';

class BarChartButtons extends Component {
  handleChangeConfirm = () =>{
    const cases = 'confirmed';
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
    return (
      <div>
          <div id="cases-btns" className="cases-btns">
            <button className="confirmed-btn btn" onClick={this.handleChangeConfirm}>Confirmed</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(BarChartButtons);