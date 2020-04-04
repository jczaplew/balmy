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

export interface MyForecastPeriod extends ForecastPeriod {
    startDayOfTheWeek: string;
    startDay: string;
    endDayOfTheWeek: string;
    endDay: string;
    minTemp?: number;
    maxTemp?: number;
    precip?: string;
}