import React from 'react';
import Header from './Components/Header';
import MapCovid from './Components/MapCovid';
import Dashboard from './Components/Dashboard'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
        <div className='container'>
          <MapCovid />
          <Dashboard />
      </div>
    </div>
  );
}

export default App;