import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Forecast from './Forecast';
import CurrentConditions from './CurrentConditions';
import HourlyGraphs from './HourlyGraphs';
import {CtoF, parseIcon} from './util';
import icons from './icons';
import {ForecastPeriod} from './types/ForecastPeriod';

export default function ForecastPage() {
    const [data, setData] = useState<any>({
        currentConditions: undefined,
        forecast: undefined,
        hourlyForecast: undefined,
    });

    async function fetchData() {
        const [currentConditions, forecast, hourlyForecast] = await Promise.all([
            await fetchCurrentConditions(),
            await fetchForecast(),
            await fetchHourlyForecast()
        ]);

       setData({currentConditions, forecast, hourlyForecast})
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <div className='App' style={{maxWidth: '1000px', margin: '0 auto', padding: '25px'}}>
        <CurrentConditions data={data.currentConditions}/>
        <Forecast data={data.forecast} />
        <HourlyGraphs data={data.hourlyForecast}/>
    </div>
}


async function fetchCurrentConditions() {
    const response = await fetch('https://api.weather.gov/stations/KMSP/observations/latest')
      .then(res => res.json())

    const parsedIcons = parseIcon(response.properties.icon);
    if (parsedIcons) {
      response.properties.icon = (icons as any)[parsedIcons[0]?.icon].icon;
    }

    response.properties['feelsLike'] = (
        response.properties.windChill.value || response.properties.heatIndex.value
    );
    return response.properties;
}

async function fetchForecast() {
    const response = await fetch('https://api.weather.gov/gridpoints/MPX/109,70/forecast')
      .then(res => res.json());

    const parsed = response.properties.periods
      .map((period: ForecastPeriod, idx: number) => {
        const temps = [
          period.temperature,
          ...(response.properties.periods[idx] ? [response.properties.periods[idx].temperature] : []),
          ...(response.properties.periods[idx + 1] ? [response.properties.periods[idx + 1].temperature] : [])
        ]

        const parsedIcon = parseIcon(period.icon)[0];
        const balmyIcon = (icons as any)[parsedIcon.icon];

        return {
          ...period,
          minTemp: Math.min(...temps),
          maxTemp: Math.max(...temps),
          precip: parsedIcon.percent,
          icon: balmyIcon.icon || period.icon,
        }
      });

     const days = parsed.map((day: ForecastPeriod) => {
        const night = parsed.filter(
          (period: ForecastPeriod) => {
            if (period.name === day.name + ' Night') return period;
            if (day.name === 'Today' && period.name === 'Tonight') return period;
          }
        );

        return {
          ...day,
          night: night.length ? night[0] : undefined,

        }
      }).filter((period: ForecastPeriod) => period.isDaytime);

    return days;
}


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

    return hourly;
}
