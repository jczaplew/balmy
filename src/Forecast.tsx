import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from '@material-ui/core';
import {BalmyForecast} from './types/ForecastPeriod';
import ForecastCard from './ForecastCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ForecastModal from './ForecastModal';


export default function Forecast({data}: {data: BalmyForecast[] | undefined}) {
    const isMobile = useMediaQuery('(max-width: 500px)');
    const [forecastModalOpen, setForecastModalOpen] = useState(false);
    const [activeForcast, setActiveForcast] = useState<BalmyForecast | undefined>();

    if (!data) return null;

    return <>
        <div style={{overflowX: 'scroll'}}>
            <div style={{
              width: isMobile ? '900px' : '1750px',
              display: 'flex',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}>
                {data.map((day, idx) => {
                  return <ForecastCard
                    key={idx}
                    period={day}
                    onClick={() => {
                      setForecastModalOpen(true);
                      setActiveForcast(day);
                    }}/>
                })}
            </div>
        </div>
        {!isMobile && <Table>
            <TableBody>
            {data.map((day, i) => {
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
                  </TableCell >
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