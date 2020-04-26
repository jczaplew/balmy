import React from 'react';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {BalmyForecast} from './types/ForecastPeriod';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

interface ForecastModalProps {
    day: BalmyForecast | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ForecastModal({day, open, setOpen}: ForecastModalProps) {
    if (!day) return null;
    return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
    >
        <DialogTitle>{moment(day.startTime).format('dddd MMM Do')}</DialogTitle>
        <DialogContent>
            <div style={{paddingBottom: '24px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                    <img src={day.icon} style={{height: '75px', marginRight: '16px'}} alt=''/>
                    <Typography variant='h6'>
                        <span style={{color: '#d5202a'}}>{day.temperature}</span>°F
                    </Typography>
                </div>
                <Typography variant='body1'>
                    {day.detailedForecast}
                </Typography>
            </div>

            {day.night && <div>
                <Typography variant='h6'>Overnight</Typography>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '16px', marginBottom: '16px'}}>
                    <img src={day.night.icon} style={{height: '75px', marginRight: '16px'}} alt=''/>
                    <Typography variant='h6'>
                        <span style={{color: '#d5202a'}}>{day.night.temperature}</span>°F
                    </Typography>
                </div>
                <Typography variant='body1'>
                    {day.night.detailedForecast}
                </Typography>
            </div>}

        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
    );
}