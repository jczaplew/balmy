import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography} from '@material-ui/core';
import {MyForecastPeriod} from './types/ForecastPeriod';
import moment from 'moment';

export default function ForecastCard({period}: {period: MyForecastPeriod}) {
    return <Card style={{margin: '8px', width: '230px', height: '175px', display: 'inline-block'}}>
        <CardContent>
            <Typography variant='subtitle1'>
               {period.name} {moment(period.startTime).format('MMM D')}
            </Typography>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <div style={{display: 'inline-block'}}>
                    <img src={period.icon} style={{height: '45px'}} alt=''/>
                </div>

                <div style={{display: 'inline-block', textAlign: 'left', marginLeft: '16px', paddingTop: '8px', paddingBottom: '8px'}}>
                    <Typography variant='h6'>
                        <span style={{color: '#d5202a'}}>{period.maxTemp}</span>°{' | '}
                        <span style={{color: '#0053ae'}}>{period.minTemp}</span>°<span style={{fontWeight: 400}}>F</span>
                    </Typography>

                    <Typography variant='body2'>
                        {period.windSpeed} {period.windDirection}
                    </Typography>
                </div>

            </div>

            <Typography variant='body2'>{period.shortForecast}</Typography>
        </CardContent>
    </Card>
}