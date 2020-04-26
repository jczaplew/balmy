import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import SatelliteIcon from '@material-ui/icons/Satellite';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Header() {
  const location = useLocation();

  return <AppBar position='static'>
    <Toolbar>
      <div style={{flexGrow: 1}}>
        <Link to='/' style={{textDecoration: 'none'}}>
          <Typography variant='h5' style={{color: '#fff', fontFamily: 'Spartan'}}>
            balmy.us
          </Typography>
        </Link>
      </div>

      <div>
        {location.pathname === '/' && <Link to='/radar' style={{textDecoration: 'none', color: '#fff'}}>
          <Button startIcon={<SatelliteIcon/>} style={{color: '#fff'}}>
              Radar
          </Button>
        </Link>}

        {location.pathname === '/radar' && <Link to='/' style={{textDecoration: 'none', color: '#fff'}}>
          <Button startIcon={<WbSunnyIcon/>} style={{color: '#fff'}}>
              Forecast
          </Button>
        </Link>}
      </div>
    </Toolbar>
  </AppBar>
}
