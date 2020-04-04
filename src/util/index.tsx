
export function CtoF(d: number) {
    return Math.round((d * 9/5) + 32);
}

export function metersPerSecondToMph(m: number) {
    return Math.round(m * 2.23694)
}

export function metersToMiles(m: number) {
    return Math.round(m * 0.0006213712);
}

export function parseIcon(iconUrl: string) {
    return iconUrl
        .replace('https://api.weather.gov/icons/', '')
        .split('?')[0]
        .split('/')
        .slice(2)
        .map(d => d.split(','))
        .map(d => { return {icon: d[0], percent: parseInt(d[1]) }})
        .sort((a, b) => b.percent - a.percent);
}
