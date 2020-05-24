import React from 'react';
import BarChart from './BarChart';
import StackedAreaChart from './StackedAreaChart';
// import ChartFirstPage from './ChartFirstPage';

const Charts = () => {
  
  return (
    <div>
      {/* <ChartFirstPage /> */}
    <div className="charts-container">
      <BarChart />
      <StackedAreaChart />
    </div>
    </div>
  )
}

export default Charts;