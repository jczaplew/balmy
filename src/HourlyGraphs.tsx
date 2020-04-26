import React, {useState, useEffect} from 'react';
import moment from 'moment';
import WeatherLine from './WeatherLine';
import {CtoF} from './util';

export default function HourlyGraphs() {
    const [hourlyForecast, setHourlyForecast] = useState<any>(undefined);

    async function fetchHourlyForecast() {
        const hourly = await fetch('https://api.weather.gov/gridpoints/MPX/109,70')
            .then(res => res.json())
            .then(res => res.properties);

        // Convert windspeed from knots to mph
        hourly.windSpeed.data = hourly.windSpeed.values.map((d: any) => {
            return {
                ...d,
                x: moment(d.validTime.split('/')[0]).toDate(),
                y: Math.round(d.value * 1.15078),
            }
        });

        // Convert temp from C to F
        hourly.temperature.data = hourly.temperature.values.map((d: any) => {
            return {
                ...d,
                x: moment(d.validTime.split('/')[0]).toDate(),
                y: CtoF(d.value),
                value: CtoF(d.value),
            }
        });

        hourly.skyCover.data = hourly.skyCover.values.map((d: any) => {
            return {
                ...d,
                x: moment(d.validTime.split('/')[0]).toDate(),
                y: d.value,
            }
        });

        hourly.probabilityOfPrecipitation.data = hourly.probabilityOfPrecipitation.values.map((d: any) => {
            return {
                ...d,
                x: moment(d.validTime.split('/')[0]).toDate(),
                y: d.value,
            }
        });

        // Nivo needs an id
        hourly.windSpeed['id'] = 'windSpeed';
        hourly.skyCover['id'] = 'skyCover';
        hourly.temperature['id'] = 'temperature';
        hourly.probabilityOfPrecipitation['id'] = 'probabilityOfPrecipitation';

        setHourlyForecast(hourly);
    }

    useEffect(() => {
        fetchHourlyForecast();
        window.addEventListener('focus', () => {
            fetchHourlyForecast();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!hourlyForecast) return null;

    const height = '200px';


    const times = hourlyForecast.temperature.data.map((d: any) => moment(d.x))
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
                data={[hourlyForecast.temperature]}
                areaBaselineValue={Math.min(...hourlyForecast.temperature.data.map((d: any) => d.value)) - 10}
                yScale={{
                    type: 'linear',
                    min: Math.min(...hourlyForecast.temperature.data.map((d: any) => d.value)) - 10,
                    max: Math.max(...hourlyForecast.temperature.data.map((d: any) => d.value)) + 10,
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
                data={[hourlyForecast.skyCover]}
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
                data={[hourlyForecast.probabilityOfPrecipitation]}
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
                data={[hourlyForecast.windSpeed]}
                yFormat={(value) => `${value} mph`}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: Math.max(...hourlyForecast.windSpeed.data.map((d: any) => d.value)) + 2,
                }}
                axisLeft={{legend: 'Wind Speed (mph)'}}
                axisBottom={{tickValues: days}}
                colors={'#15aadc'}
                enableArea={false}
            />
        </div>
    </div>
}