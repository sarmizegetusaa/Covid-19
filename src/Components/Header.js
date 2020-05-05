import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component{

  toggleTimeline = () => {
    const active = {
      activeCumulative: false,
      activeTimeline: true,
      nowCase: 3
    }
    this.props.toggleTimeline(active);
  };

  toggleCumulative = () => {
    const active = {
      activeCumulative: true,
      activeTimeline: false
    }
    this.props.toggleCumulative(active);
  };

  render(){
    return (
      <div>
        <div id="container-header">
          <div id="header">
            <div className="page-btns">
              <button id="recent-cases-btn" onClick={this.toggleCumulative}>Recent Cases</button>
              <button id="timeline-btn" onClick={this.toggleTimeline}>Timeline</button>
            </div>
            <div className="title">Coronavirus COVID-19 Global Cases</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    activeCumulative: state.activeCumulative,
    activeTimeline: state.activeTimeline,
    nowCase: state.nowCase
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    toggleTimeline: (active) => { dispatch({type: 'TOGGLE_TIMELINE', active:active})},
    toggleCumulative: (active) => { dispatch({type: 'TOGGLE_CUMULATIVE', active:active})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);