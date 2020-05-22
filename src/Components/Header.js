import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <button id="recent-cases-btn" onClick={this.toggleCumulative}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20.763 10.377c-.694.519-1.537.801-2.403.801-1.607 0-2.415-1.963-1.282-3.095.614-.615 1.406-1.009 2.266-1.133 1.621-.233 2.334-2.244 1.142-3.437s-3.203-.479-3.437 1.142c-.123.857-.52 1.653-1.132 2.266-1.138 1.138-3.095.329-3.095-1.282 0-.869.28-1.708.801-2.403.983-1.312.061-3.236-1.623-3.236-1.683 0-2.606 1.923-1.623 3.237.519.693.801 1.537.801 2.403 0 1.61-1.956 2.421-3.095 1.282-.614-.614-1.008-1.405-1.132-2.266-.233-1.621-2.243-2.334-3.436-1.141s-.48 3.203 1.141 3.436c.857.123 1.653.52 2.266 1.132 1.138 1.139.329 3.095-1.282 3.095-.869 0-1.707-.28-2.403-.801-1.313-.983-3.237-.061-3.237 1.623 0 1.683 1.923 2.606 3.237 1.623.693-.519 1.537-.801 2.403-.801 1.61 0 2.421 1.956 1.282 3.095-.614.615-1.406 1.009-2.266 1.133-1.621.233-2.334 2.244-1.142 3.437s3.203.479 3.437-1.142c.123-.857.52-1.653 1.132-2.266 1.139-1.138 3.095-.329 3.095 1.282 0 .869-.28 1.708-.801 2.404-.981 1.308-.064 3.235 1.623 3.235 1.677 0 2.611-1.919 1.621-3.24-.518-.689-.799-1.528-.799-2.39 0-1.615 1.957-2.432 3.095-1.293.615.615 1.009 1.406 1.133 2.267.233 1.621 2.244 2.334 3.437 1.142 1.19-1.19.483-3.206-1.146-3.437-.854-.121-1.646-.515-2.255-1.125-1.143-1.141-.337-3.102 1.274-3.102.87 0 1.708.28 2.404.801 1.309.981 3.236.064 3.236-1.623 0-1.686-1.926-2.605-3.237-1.623zm-10.728 4.296c-.547 0-.99-.443-.99-.99s.443-.99.99-.99.99.443.99.99-.443.99-.99.99zm1.262-3.143c-.858 0-1.553-.695-1.553-1.553s.695-1.553 1.553-1.553 1.553.695 1.553 1.553-.695 1.553-1.553 1.553zm2.928 2.969c-.727 0-1.315-.589-1.315-1.315s.589-1.315 1.315-1.315 1.315.589 1.315 1.315-.589 1.315-1.315 1.315z" fill="#fff"/></svg> <Link to='/'>Recent Cases</Link></button>
              <button id="timeline-btn" onClick={this.toggleTimeline}><Link to='/'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z" fill="#fff"/></svg> Timeline</Link></button>
              <button id="barchart" ><Link to='/charts'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z" fill="#fff"/></svg> Statistics</Link></button>
            </div>
          </div>
          <div className="title">COVID-19 Global Cases</div>
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