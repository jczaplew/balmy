import React from 'react';
import {Typography} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NavigationIcon from '@material-ui/icons/Navigation';
import {CtoF, metersToMiles, metersToFeet, metersPerSecondToMph} from './util';
import getCardinalDirection from './util/getCardinalDirection';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';

export default function CurrentConditions(
    {data, stationInfo}: {data: any | undefined, stationInfo: any | undefined}
) {
    const isMobile = useMediaQuery('(max-width: 500px)');

    if (!data || !stationInfo) return null;

    let stationName = stationInfo.properties.name.split(',');
    if (stationName[1]) {
        stationName = stationName[1].trim();
    } else {
        stationName = stationInfo.properties.name;
    }

    return <div>
        <div style={{textAlign: 'left'}}>
            <Typography variant='h5'>
                {stationName}
            </Typography>
        </div>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'space-evenly' : 'space-between',
        padding: isMobile ? 0 : '40px',
    }}>
        <div>
            <img
                src={data.icon}
                style={{width: isMobile ? '130px': '175px'}}
                alt=''
            />
        </div>
        <div>
            <Typography variant={isMobile ? 'h2': 'h1'} style={{fontFamily: 'Spartan'}}>
                {CtoF(data.temperature.value)}°F
            </Typography>
            {data.feelsLike && <Typography variant='h5'>
                Feels like {CtoF(data.feelsLike)}°F
            </Typography>}
            {!isMobile && <div>
                <Typography variant='h3' style={{display: 'inline-block'}}>
                    <NavigationIcon style={{
                        transform: `rotate(${data.windDirection.value - 180}deg)`,
                        marginRight: '8px',
                    }}/>
                    {metersPerSecondToMph(data.windSpeed.value)}
                    {data.windGust.value ?
                    ' | ' + metersPerSecondToMph(data.windGust.value) : ''}
                </Typography>
                <Typography variant='h5' style={{display: 'inline-block', marginLeft: '8px'}}>mph</Typography>
                <Typography variant='h5'  style={{display: 'inline-block', marginLeft: '8px'}}>
                    {getCardinalDirection(data.windDirection.value)}
                </Typography>
            </div>}
        </div>

        {!isMobile && <CurrentDetails data={data} stationInfo={stationInfo} /> }
    </div>
        {isMobile && <CurrentDetails data={data} stationInfo={stationInfo} /> }
    </div>;
}

function CurrentDetails({data, stationInfo}: {data: any, stationInfo: any}) {
    if (!data) return null;

    const distanceMi = metersToMiles(stationInfo.properties.distance);

    return <div>
        <Table size="small" >
            <TableBody>
                <TableRow>
                    <TableCell>
                    <Typography variant='subtitle2'>Last updated</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant='body2'>{moment(data.timestamp).fromNow()}</Typography>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                    <Typography variant='subtitle2'>Elevation</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant='body2'>
                        {metersToFeet(stationInfo.properties.elevation.value)} ft
                    </Typography>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                    <Typography variant='subtitle2'>Distance</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant='body2'>
                        {distanceMi} mi {getCardinalDirection(stationInfo.properties.bearing)}
                    </Typography>
                    </TableCell>
                </TableRow>

                <TableRow className='mobile-wind'>
                    <TableCell>
                        <Typography variant='subtitle2'>Wind</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body2'>
                            {metersPerSecondToMph(data.windSpeed.value)} mph {getCardinalDirection(data.windDirection.value)}
                        </Typography>
                    </TableCell>
                </TableRow>
                {data.windGust.value && <TableRow className='mobile-wind'>
                    <TableCell>
                        <Typography variant='subtitle2'>Gusting</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='body2'>
                            {metersPerSecondToMph(data.windGust.value)} mph
                        </Typography>
                    </TableCell>
                </TableRow>}

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Humidity</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    Math.round(data.relativeHumidity.value)
                }%</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Dew Point</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    CtoF(data.dewpoint.value)
                }°F</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Visiblity</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    metersToMiles(data.visibility.value)
                } mi</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                <Typography variant='subtitle2'>Pressure</Typography>
                </TableCell>
                <TableCell>
                <Typography variant='body2'>{
                    Math.round(data.barometricPressure.value * 0.01)
                } mb</Typography>
                </TableCell>
            </TableRow>

            </TableBody>
        </Table>
    </div>
}