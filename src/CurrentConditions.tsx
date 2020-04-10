import React, {useState, useEffect} from 'react';
import {Typography} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NavigationIcon from '@material-ui/icons/Navigation';
import {CtoF, metersToMiles, metersPerSecondToMph, parseIcon} from './util';
import getCardinalDirection from './util/getCardinalDirection';
import icons from './icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function CurrentConditions() {
    const [currentConditions, setCurrentConditions] = useState<any>(undefined);
    const isMobile = useMediaQuery('(max-width: 500px)');

    async function fetchCurrentConditions() {
        const response = await fetch('http://api.weather.gov/stations/KMSP/observations/latest')
          .then(res => res.json())

        const parsedIcons = parseIcon(response.properties.icon);
        if (parsedIcons) {
          response.properties.icon = (icons as any)[parsedIcons[0]?.icon].icon;
        }

        response.properties['feelsLike'] = currentConditions?.properties.windChill.value || currentConditions?.properties.heatIndex.value;
        setCurrentConditions(response.properties);
      }

    useEffect(() => {
        fetchCurrentConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!currentConditions) return null;

    return <div>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: isMobile ? 0 : '40px',
    }}>
        <div>
            <img
                src={currentConditions.icon}
                style={{width: isMobile ? '130px': '175px'}}
                alt=''
            />
        </div>
        <div>
            <Typography variant={isMobile ? 'h2': 'h1'}>
                {CtoF(currentConditions.temperature.value)}°F
            </Typography>
            {currentConditions.feelsLike && <Typography variant='h5'>
                Feels like {CtoF(currentConditions.feelsLike)}°F
            </Typography>}
            {!isMobile && <div>
                <Typography variant='h3' style={{display: 'inline-block'}}>
                    <NavigationIcon style={{
                        transform: `rotate(${currentConditions.windDirection.value - 180}deg)`,
                        marginRight: '8px',
                    }}/>
                    {metersPerSecondToMph(currentConditions.windSpeed.value)}
                    {currentConditions.windGust.value ?
                    ' | ' + metersPerSecondToMph(currentConditions.windGust.value) : ''}
                </Typography>
                <Typography variant='h5' style={{display: 'inline-block', marginLeft: '8px'}}>mph</Typography>
                <Typography variant='h5'  style={{display: 'inline-block', marginLeft: '8px'}}>
                    {getCardinalDirection(currentConditions.windDirection.value)}
                </Typography>
            </div>}
        </div>

        {!isMobile && <CurrentDetails currentConditions={currentConditions} /> }
    </div>
        {isMobile && <CurrentDetails currentConditions={currentConditions} /> }
    </div>;
}

function CurrentDetails({currentConditions}: {currentConditions: any}) {
    if (!currentConditions) return null
    return <div>
        <Table size="small" >
            <TableBody>
                <TableRow className='mobile-wind'>
                    <TableCell>
                        <Typography variant='subtitle2'>Wind</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body2'>
                            {metersPerSecondToMph(currentConditions.windSpeed.value)} mph {getCardinalDirection(currentConditions.windDirection.value)}
                        </Typography>
                    </TableCell>
                </TableRow>
                {currentConditions.windGust.value && <TableRow className='mobile-wind'>
                    <TableCell>
                        <Typography variant='subtitle2'>Gusting</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body2'>
                            {metersPerSecondToMph(currentConditions.windGust.value)} mph
                        </Typography>
                    </TableCell>
                </TableRow>}

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Humidity</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    Math.round(currentConditions.relativeHumidity.value)
                }%</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Dew Point</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    CtoF(currentConditions.dewpoint.value)
                }°F</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Visiblity</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    metersToMiles(currentConditions.visibility.value)
                } mi</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Pressure</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    Math.round(currentConditions.barometricPressure.value * 0.01)
                } mb</Typography>
                </TableCell>
            </TableRow>

            </TableBody>
        </Table>
    </div>
}