import React from 'react';
import Card, {CardProps} from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography} from '@material-ui/core';
import {BalmyForecast} from './types/ForecastPeriod';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    cardRoot: {
        margin: '8px',
        width: '230px',
        height: '175px',
        display: 'inline-block'
    },
    cardRootMobile: {
        margin: '4px',
        padding: '4px',
        width: '110px',
        height: '100px',
        display: 'inline-block'
    },
    cardContentMobile: {
        padding: '4px',
        '&:last-child': {
            paddingBottom: 0,
        }
    }
})
export default function ForecastCard({period, ...restProps}: CardProps & {period: BalmyForecast}) {
    const isMobile = useMediaQuery('(max-width: 500px)');
    const classes = useStyles();

    const dayFormat = isMobile ? 'ddd D' : 'dddd MMM D';

    return <Card classes={{
        root: isMobile ? classes.cardRootMobile : classes.cardRoot,
    }} {...restProps}>
        <CardContent classes={{root: isMobile ? classes.cardContentMobile : ''}}>
            <Typography variant='subtitle1' style={{fontFamily: 'Spartan'}}>
               {moment(period.startTime).format(dayFormat)}
            </Typography>

            <div style={{
                display: isMobile ? 'block': 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <div style={{display: isMobile ? 'block' : 'inline-block'}}>
                    <img src={period.icon} style={{height: isMobile ? '30px' : '45px'}} alt=''/>
                </div>

                <div style={{
                    display: isMobile ? 'block' : 'inline-block',
                    textAlign: 'center',
                    marginLeft: isMobile ? 0 : '16px',
                    paddingTop: isMobile ? '4px': '8px',
                    paddingBottom: isMobile ? 0 : '8px'
                }}>
                    <Typography variant='h6'>
                        <span style={{color: '#d5202a'}}>{period.maxTemp}</span>°{' | '}
                        <span style={{color: '#0053ae'}}>{period.minTemp}</span>°<span style={{fontWeight: 400}}>F</span>
                    </Typography>

                    {!isMobile && <Typography variant='body2'>
                        {period.windSpeed} {period.windDirection}
                    </Typography>}
                </div>
            </div>

            {!isMobile && <Typography variant='body2'>{period.shortForecast}</Typography>}
        </CardContent>
    </Card>
}