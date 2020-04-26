import React from 'react';
import moment from 'moment';
import WeatherLine from './WeatherLine';

export default function HourlyGraphs({data}: {data: any | undefined}) {
    if (!data) return null;

    const height = '200px';


    const times = data.temperature.data.map((d: any) => moment(d.x))
    const minDay = moment.min(...times).startOf('day').add(1, 'day');
    const maxDay = moment.max(...times).startOf('day');

    const range = maxDay.diff(minDay, 'days');
    const days = [minDay.toDate()]

    for (let i = 1; i <= range; i++) {
        days.push(minDay.clone().add(i, 'days').toDate())
    }

    return <div>
        <div style={{height, userSelect: 'none'}}>
            <WeatherLine
                data={[data.temperature]}
                areaBaselineValue={Math.min(...data.temperature.data.map((d: any) => d.value)) - 10}
                yScale={{
                    type: 'linear',
                    min: Math.min(...data.temperature.data.map((d: any) => d.value)) - 10,
                    max: Math.max(...data.temperature.data.map((d: any) => d.value)) + 10,
                }}
                yFormat={(value) => `${value}°F`}
                axisLeft={{
                    legend: 'Degrees F',
                    format: (value) => `${value}°`,
                }}
                axisBottom={{tickValues: days}}
                colors={'#ff8833'}
            />
        </div>

        <div style={{height, userSelect: 'none'}}>
            <WeatherLine
                data={[data.skyCover]}
                yFormat={(value) => `${value}%`}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 100,
                }}
                axisLeft={{
                    legend: 'Cloud cover',
                    tickValues: [0, 25, 50, 75, 100],
                    format: (value) => `${value}%`,
                }}
                axisBottom={{tickValues: days}}
                colors={'#a3a3a3'}
            />
        </div>

        <div style={{height, userSelect: 'none'}}>
            <WeatherLine
                data={[data.probabilityOfPrecipitation]}
                yFormat={(value) => `${value}%`}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 100,
                }}
                axisLeft={{
                    legend: 'Chance of Precip',
                    tickValues: [0, 25, 50, 75, 100],
                    format: (value) => `${value}%`,
                }}
                axisBottom={{tickValues: days}}
                colors={'#15aadc'}
            />
        </div>

        <div style={{height, userSelect: 'none'}}>
            <WeatherLine
                data={[data.windSpeed]}
                yFormat={(value) => `${value} mph`}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: Math.max(...data.windSpeed.data.map((d: any) => d.value)) + 2,
                }}
                axisLeft={{legend: 'Wind Speed (mph)'}}
                axisBottom={{tickValues: days}}
                colors={'#15aadc'}
                enableArea={false}
            />
        </div>
    </div>
}