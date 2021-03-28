import React from 'react';
import dayjs from 'dayjs';
import Highcharts, {Options} from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import {BalmyForecast} from './types/ForecastPeriod';

export default function PrecipGraph({day}: {day: BalmyForecast}) {
    const precip = day.hourlyPrecip.map((d: any) =>
        [dayjs(d.validTime.split('/')[0]).valueOf(), d.value]
    );

    const clouds = day.hourlyClouds.map((d: any) =>
        [dayjs(d.validTime.split('/')[0]).valueOf(), d.value]
    );

    const options: Options = {
        chart: {
            type: 'areaspline',
            height: 250,
            marginLeft: 35,
        },
        time: {
            useUTC: false,
        },
        legend: {
            enabled: false,
        },
        title: {
            text: undefined,
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats : {
                hour: '%H',
            },
            labels: {
                format: '{value:%H}'
            },
            plotLines: [{
                color: '#aaaaaa',
                value: dayjs().valueOf(),
                width: 1,
                zIndex: 2,
            }],
            max: dayjs(clouds[0][0]).endOf('day').add(4, 'hours').valueOf(),
        },
        yAxis: {
            title: {
                text: undefined,
            },
            endOnTick: false,
            tickInterval: 5,
            min: 0,
            max: 100,
        },
        tooltip: {
            shared: true,
            formatter: function() {
                return `${this.y} @ ${dayjs(this.x).format('h A')}`
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                marker: {
                    enabled: false,
                }
            }
        },
        series: [{
            name: 'Precip',
            type: 'areaspline',
            data: precip      ,
            color: '#15aadc',
        }, {
            name: 'Clouds',
            type: 'areaspline',
            data: clouds      ,
            color: '#a3a3a3',
        }]
    };

    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />

}