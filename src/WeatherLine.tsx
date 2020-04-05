import React from 'react';
import {ResponsiveLine, LineSvgProps} from '@nivo/line';
import {Typography} from '@material-ui/core';
import moment from 'moment';

interface WeatherLine extends LineSvgProps {
    areaBaselineValue?: number;
}

export default function WeatherLine({axisBottom, axisLeft, ...props}: WeatherLine) {
    return <ResponsiveLine
        margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
        xScale={{
            type: 'time',
            format: 'native',
            precision: 'day',
        }}
        xFormat="time:%m/%d %H:00"
        yFormat={(value) => `${value}°F`}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve='monotoneX'
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: '%a %m/%e',
            tickValues: 'every day',
            legendOffset: -12,
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            ...axisBottom,
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickValues: 7,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -45,
            legendPosition: 'middle',
            ...axisLeft,
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={2}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.5}
        useMesh={true}
        enableSlices='x'
        sliceTooltip={(slice) => {
            return <div style={{
                paddingTop: '2px',
                paddingBottom: '2px',
                paddingLeft: '4px',
                paddingRight: '4px',
                backgroundColor: '#fff',
                border: '1px solid #eee',
            }}>
                <Typography variant='subtitle2'>
                {slice.slice.points[0].data.yFormatted} @ {moment(slice.slice.points[0].data.x).format('hA')}
                </Typography>
            </div>
        }}
        {...props}
    />
}