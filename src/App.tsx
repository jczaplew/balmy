import React from 'react';
import './App.css';

import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import HourlyGraphs from './HourlyGraphs';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';

// const precipRegex = new RegExp(/Chance of precipitation is (\d+)%./g);

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{maxWidth: '1000px', margin: '0 auto', padding: '25px'}}>
        <CurrentConditions/>
        <Forecast/>
        <HourlyGraphs/>
      </div>
    </ThemeProvider>
  );
}

export default App;
