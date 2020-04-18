import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import HourlyGraphs from './HourlyGraphs';
import Radar from './Radar';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';

// const precipRegex = new RegExp(/Chance of precipitation is (\d+)%./g);

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>

          <Route path='/radar'>
            <Radar />
          </Route>

          <Route path='/'>
            <div className="App" style={{maxWidth: '1000px', margin: '0 auto', padding: '25px'}}>
              <CurrentConditions/>
              <Forecast/>
              <HourlyGraphs/>
            </div>
          </Route>

        </Switch>
      </Router>

    </ThemeProvider>
  );
}

export default App;
