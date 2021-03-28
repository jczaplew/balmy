
export function CtoF(d: number) {
    return Math.round((d * 9/5) + 32);
}

export function metersPerSecondToMph(m: number) {
    return Math.round(m * 2.23694)
}

export function kphToMph(kph: number) {
    return Math.round(kph * 0.62);
}

export function metersToMiles(m: number) {
    return Math.round(m * 0.0006213712);
}

export function metersToFeet(m: number) {
    return Math.round(m * 3.28084);
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


export function distanceM (a: [number, number], b: [number, number]) {
    const Δφ = (b[1] - a[1]) * Math.PI / 180;
    const Δλ = (b[0] - a[0]) * Math.PI / 180;

    const Q = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos((a[1] * Math.PI / 180.0)) *
        Math.cos((b[1] * Math.PI / 180.0)) * Math.sin(Δλ/2) * Math.sin(Δλ/2);

    return 6371e3 * (2 * Math.atan2(Math.sqrt(Q), Math.sqrt(1-Q)));
}

export function bearing(a: [number, number], b: [number, number]) {
    const y = Math.sin(b[1]-a[1]) * Math.cos(b[0]);
    const x = Math.cos(a[0]) * Math.sin(b[0]) -
        Math.sin(a[0]) * Math.cos(b[0]) * Math.cos(b[1] - a[1]);

    return ((Math.atan2(y, x)) * 180 / Math.PI + 360) % 360;
}
