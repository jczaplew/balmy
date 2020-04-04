import React, {useState, useEffect} from 'react';
import './App.css';

import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import HourlyGraphs from './HourlyGraphs';

const precipRegex = new RegExp(/Chance of precipitation is (\d+)%./g);

function App() {

  return (
    <div className="App" style={{maxWidth: '1000px', margin: '0 auto', padding: '25px'}}>
      <CurrentConditions/>
      <Forecast/>
      <HourlyGraphs/>
    </div>
  );
}

export default App;
