import React from 'react';
import Header from './Components/Header';
import MapCovid from './Components/MapCovid';
import Dashboard from './Components/Dashboard';
import Data from './Components/Data';
import Charts from './Components/Charts';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path={['/', '/barchart']} component={Data}/>
          <div className='container'>
            <Route path='/' exact component={MapCovid} />
            <Route path='/' exact component={Dashboard} />
          </div>
            <Route path='/charts' component={Charts}/>
      </div>
    </Router>
  );
}

export default App;