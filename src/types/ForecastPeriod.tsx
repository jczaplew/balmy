export type ForecastPeriod = {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: string | null;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

export interface BalmyForecast extends ForecastPeriod {
    night: BalmyForecast;
    minTemp: number;
    maxTemp: number;
    precip: string;
    hourlyClouds?: any;
    hourlyDewpoint?: any;
    hourlyFeelsLike?: any;
    hourlyPrecip?: any;
    hourlyTemp?: any;
    hourlyWind?: any;
    hourlyWindGust: any[];
}