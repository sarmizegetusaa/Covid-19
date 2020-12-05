import React from 'react';
import BarChart from './BarChart';
import StackedAreaChart from './StackedAreaChart';

const Charts = () => {
  
  return (
    <div>
    <div className="charts-container">
      <BarChart />
      <StackedAreaChart />
    </div>
    </div>
  )
}

export default Charts;