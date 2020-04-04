import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from '@material-ui/core';
import {ForecastPeriod, MyForecastPeriod} from './types/ForecastPeriod';
import {parseIcon} from './util';
import icons from './icons';

export default function Forecast() {
    const [forecast, setForecast] = useState<MyForecastPeriod[]>([]);

    async function fetchForecast() {
        const response = await fetch('https://api.weather.gov/gridpoints/MPX/109,70/forecast')
          .then(res => res.json());

        const periods: MyForecastPeriod[] = response.properties.periods.map((period: ForecastPeriod) => {
          // Get min/max temp for that day
          const startDayOfTheWeek = moment(period.startTime).format('ddd');

          let temps = []
          if (period.isDaytime) {
            temps = response.properties.periods.filter((p:any) => {
              if (
                moment(p.startTime).format('ddd') === startDayOfTheWeek ||
                moment(p.endTime).format('ddd') === startDayOfTheWeek
              ) {
                return p
              }
            }).map((p: any) => p.temperature);
          }
          const minMaxTemps = !temps ? {} : {
            minTemp: Math.min(...temps),
            maxTemp: Math.max(...temps),
          }

          const parsedIcons = parseIcon(period.icon);

          return {
            ...period,
            startDayOfTheWeek,
            startDay: moment(period.startTime).format('M/D'),
            endDayOfTheWeek: moment(period.endTime).format('ddd'),
            endDay: moment(period.endTime).format('M/D'),
            ...(parsedIcons.length && parsedIcons[0].percent ? {precip: parsedIcons[0].percent} : {}),
            ...minMaxTemps,
            ...(parsedIcons ? {icon: (icons as any)[parsedIcons[0].icon]?.icon || period.icon} : {icon: period.icon} ),

          }
        });


        setForecast(periods.filter((period: MyForecastPeriod) => period.isDaytime));
      }

    useEffect(() => {
        fetchForecast();
    }, []);

    if (!forecast) return null;

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {forecast.map(day => {
            return <div style={{display: 'inline-block', padding: '8px', fontSize: '12px'}} key={day.number}>
                <Typography variant='h5'>{day.startDayOfTheWeek} {day.startDay}</Typography>
                {day.minTemp &&
                <Typography variant='body1'>
                    <span style={{color: '#d5202a'}}>{day.maxTemp}</span>°{' | '}
                    <span style={{color: '#0053ae'}}>{day.minTemp}</span>°<span style={{fontWeight: 400}}>F</span>
                </Typography>
                }
                <img src={day.icon} style={{width: '80px'}} alt=''/>
                {day.precip && <p>Precip: {day.precip}%</p>}
            </div>
            })}
        </div>
        <Table>
            <TableBody>
            {forecast.map((day, i) => {
            return <TableRow key={i}>
                <TableCell>{day.startDayOfTheWeek} {day.startDay}</TableCell>
                <TableCell><span style={{color: '#d5202a'}}>{day.maxTemp}</span>°{' | '}
                    <span style={{color: '#0053ae'}}>{day.minTemp}</span>°<span style={{fontWeight: 400}}>F</span></TableCell>
                <TableCell>{day.windSpeed} {day.windDirection}</TableCell>
                <TableCell style={{width: '50%', textAlign: 'left'}}>{day.detailedForecast}</TableCell>
            </TableRow>
            })}
            </TableBody>
        </Table>
    </>
}