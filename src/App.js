import React from 'react';
import Header from './Components/Header';
import MapCovid from './Components/MapCovid';
import Dashboard from './Components/Dashboard';
import BarChart from './Components/BarChart';
import ClassBarChart from './Components/ClassBarChart';
import Data from './Components/Data';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path='/' component={Data}/>
          <div className='container'>
            <Route path='/' exact component={MapCovid} />
            <Route path='/' exact component={Dashboard} />
            <Route path='/barchart' component={BarChart}/>
            <Route path='/bar' component={ClassBarChart}/>
            {/* <Redirect from='/bar' to="/barchart/" /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;