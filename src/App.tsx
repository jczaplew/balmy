import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ForecastPage from './ForecastPage';
import Radar from './Radar';
import Header from './Header';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';

function App() {
  const LNG = -93.2054;
  const LAT = 44.9475;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <Switch>

          <Route path='/radar'>
            <Radar lng={LNG} lat={LAT} />
          </Route>

          <Route path='/'>
            <ForecastPage />
          </Route>

        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
