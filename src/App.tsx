import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ForecastPage from './ForecastPage';
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
            <ForecastPage />
          </Route>

        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
