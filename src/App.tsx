import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import './App.css';

import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import HourlyGraphs from './HourlyGraphs';
import Radar from './Radar';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import Fab from '@material-ui/core/Fab';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import SatelliteIcon from '@material-ui/icons/Satellite';

function App() {
  const fabStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '25px',
    right: 0,
    margin: '16px',
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>

          <Route path='/radar'>
            <Radar />
            <Link to='/'>
              <Fab color='primary' aria-label="forecast" style={fabStyle}>
                <WbSunnyIcon />
              </Fab>
            </Link>

          </Route>

          <Route path='/'>
            <div className='App' style={{maxWidth: '1000px', margin: '0 auto', padding: '25px'}}>
              <CurrentConditions/>
              <Forecast/>
              <HourlyGraphs/>
              <Link to='/radar'>
                <Fab color='primary' aria-label="radar" style={fabStyle}>
                  <SatelliteIcon />
                </Fab>
              </Link>
            </div>
          </Route>

        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
