import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import HourlyGraphs from './HourlyGraphs';
import Radar from './Radar';
import Header from './Header';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <Switch>

          <Route path='/radar'>
            <Radar />
          </Route>

          <Route path='/'>
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
