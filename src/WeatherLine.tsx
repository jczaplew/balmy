import React from 'react';
import {ResponsiveLine, LineSvgProps} from '@nivo/line';

interface WeatherLine extends LineSvgProps {
    areaBaselineValue?: number;
}

export default function WeatherLine({axisBottom, axisLeft, ...props}: WeatherLine) {
    return <ResponsiveLine
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
            tickValues: 'every 1 day',
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
            legendOffset: -40,
            legendPosition: 'middle',
            ...axisLeft,
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={2}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.5}
        useMesh={true}
        {...props}
    />
}