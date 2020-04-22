import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Typography} from '@material-ui/core';
import {ForecastPeriod, BalmyForecast} from './types/ForecastPeriod';
import {parseIcon} from './util';
import icons from './icons';
import ForecastCard from './ForecastCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles} from '@material-ui/styles'
import ForecastModal from './ForecastModal';

const useStyles = makeStyles({
  expansionRoot: {
    padding: 0,
  },
  expansionContent: {
    display: 'table',
  },
  tableCell: {
    border: 0,
  }
})

export default function Forecast() {
    const [forecast, setForecast] = useState<BalmyForecast[]>([]);
    const isMobile = useMediaQuery('(max-width: 500px)');
    const [forecastModalOpen, setForecastModalOpen] = useState(false);
    const [activeForcast, setActiveForcast] = useState<BalmyForecast | undefined>();

    const classes = useStyles();

    async function fetchForecast() {
        const response = await fetch('https://api.weather.gov/gridpoints/MPX/109,70/forecast')
          .then(res => res.json());

        const parsed = response.properties.periods
          .map((period: ForecastPeriod, idx: number) => {
            const temps = [
              period.temperature,
              ...(response.properties.periods[idx] ? [response.properties.periods[idx].temperature] : []),
              ...(response.properties.periods[idx + 1] ? [response.properties.periods[idx + 1].temperature] : [])
            ]
            console.log(temps)
            const parsedIcon = parseIcon(period.icon)[0];
            const balmyIcon = (icons as any)[parsedIcon.icon];

            return {
              ...period,
              minTemp: Math.min(...temps),
              maxTemp: Math.max(...temps),
              precip: parsedIcon.percent,
              icon: balmyIcon.icon || period.icon,
            }
          });

         const days = parsed.map((day: ForecastPeriod) => {
            const night = parsed.filter(
              (period: ForecastPeriod) => {
                if (period.name === day.name + ' Night') return period;
              }
            );

            return {
              ...day,
              night: night.length ? night[0] : undefined,

            }
          }).filter((period: ForecastPeriod) => period.isDaytime);

        const periods: BalmyForecast[] = response.properties.periods.map((period: ForecastPeriod) => {
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
              return false
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

        console.log(days)

        setForecast(days);
      }

    useEffect(() => {
        fetchForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!forecast) return null;

    return <>
        <div style={{overflowX: 'scroll'}}>
            <div style={{
              width: isMobile ? '900px' : '1750px',
              display: 'flex',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}>
                {forecast.map(day => {
                  return <ForecastCard
                    period={day}
                    onClick={() => {
                      console.log(day)
                      setForecastModalOpen(true);
                      setActiveForcast(day);
                    }}/>
                })}
            </div>
            {/* <div>
                {forecast.map(day => {
                return <div style={{display: 'inline-block', padding: '8px', fontSize: '12px'}} key={day.number}>
                    <Typography variant='h5'>{day.startDayOfTheWeek} {day.startDay}</Typography>
                    {day.minTemp &&
                    <Typography variant='body1'>
                        <span style={{color: '#d5202a'}}>{day.maxTemp}</span>°{' | '}
                        <span style={{color: '#0053ae'}}>{day.minTemp}</span>°<span style={{fontWeight: 400}}>F</span>
                    </Typography>
                    }
                    <img src={day.icon} style={{height: '80px'}} alt=''/>
                    {day.precip && <p>Precip: {day.precip}%</p>}
                </div>
                })}
            </div> */}
        </div>
        {!isMobile && <Table>
            <TableBody>
            {forecast.map((day, i) => {
            return <TableRow key={i}>
                 <TableCell style={{padding: isMobile ? '10px' : '16px'}}>
                      <Typography variant='body2'>{moment(day.startTime).format('ddd')} {moment(day.startTime).format('M/D')}</Typography>
                  </TableCell>
                  <TableCell style={{padding: isMobile ? '10px' : '16px'}}>
                      <Typography variant='body2'>
                          <span style={{color: '#d5202a'}}>{day.maxTemp}</span>°{' | '}
                          <span style={{color: '#0053ae'}}>{day.minTemp}</span>°
                          <span style={{fontWeight: 400}}>F</span>
                      </Typography>
                  </TableCell>
                  <TableCell style={{padding: isMobile ? '10px' : '16px'}}>
                      <Typography variant='body2'>{day.windSpeed} {day.windDirection}</Typography>
                  </TableCell>
                  {!isMobile && <TableCell style={{width: '50%', textAlign: 'left', padding: isMobile ? '10px' : '16px'}}>
                      <Typography variant='body2'>{day.detailedForecast}</Typography>
                  </TableCell>}
              </TableRow>
            })}
            </TableBody>
        </Table>}
        <ForecastModal day={activeForcast} open={forecastModalOpen} setOpen={setForecastModalOpen} />
    </>
}