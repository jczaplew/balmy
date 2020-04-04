import React, {useState, useEffect} from 'react';
import moment from 'moment';
import WeatherLine from './WeatherLine';

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
            y: Math.round((d.value * 9/5) + 32),
            value: Math.round((d.value * 9/5) + 32),
            }
        });

        hourly.skyCover.data = hourly.skyCover.values.map((d: any) => {
            return {
            ...d,
            x: moment(d.validTime.split('/')[0]).toDate(),
            y: d.value,
            }
        })
        hourly.skyCover['id'] = 'skyCover';
        hourly.temperature['id'] = 'temperature';

        hourly.probabilityOfPrecipitation.data = hourly.probabilityOfPrecipitation.values.map((d: any) => {
            return {
                ...d,
                x: moment(d.validTime.split('/')[0]).toDate(),
                y: d.value,
            }
        });
        hourly.probabilityOfPrecipitation['id'] = 'probabilityOfPrecipitation';

        setHourlyForecast(hourly);
    }

    useEffect(() => {
        fetchHourlyForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!hourlyForecast) return null;

    const height = '200px';

    return <div>
        <div style={{height}}>
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
                colors={'#ff8833'}
            />
        </div>

        <div style={{height}}>
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
                colors={'#a3a3a3'}
            />
        </div>

        <div style={{height}}>
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
                colors={'#15aadc'}
            />
        </div>

        <div style={{height}}>
            <WeatherLine
                data={[hourlyForecast.windSpeed]}
                yFormat={(value) => `${value} mph`}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: Math.max(...hourlyForecast.windSpeed.data.map((d: any) => d.value)) + 2,
                }}
                axisLeft={{legend: 'Wind Speed (mph)'}}
                colors={'#15aadc'}
                enableArea={false}
            />
        </div>
    </div>
}