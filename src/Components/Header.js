import React from 'react';

export default function Header() {
  return (
    <div>
      <div id="container-header">
        <div id="header">
          <div className="page-btns">
            <button id="recent-cases-btn">Recent Cases</button>
            <button id="timeline-btn">Timeline</button>
          </div>
          <div className="title">Coronavirus COVID-19 Global Cases</div>
        </div>
      </div>
    </div>
  )
}