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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
            <AppBar position="static">
              <Toolbar>
                <div style={{flexGrow: 1}}>
                  <Link to='/' style={{textDecoration: 'none'}}>
                    <Typography variant='h5' style={{color: '#fff', fontFamily: 'Spartan'}}>
                      balmy.us
                    </Typography>
                  </Link>
                </div>

                <div>
                  <Link to='/radar' style={{textDecoration: 'none', color: '#fff'}}>
                    <Button startIcon={<SatelliteIcon/>} style={{color: '#fff'}}>
                        Radar
                    </Button>
                  </Link>
                </div>

              </Toolbar>
            </AppBar>
            <div className='App' style={{maxWidth: '1000px', margin: '0 auto', padding: '25px'}}>
              <CurrentConditions/>
              <Forecast/>
              <HourlyGraphs/>
            </div>
          </Route>

        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
