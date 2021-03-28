import React, {useEffect, useState, useMemo} from 'react';
import mapboxgl from 'mapbox-gl';
import Slider from '@material-ui/core/Slider';
import dayjs from 'dayjs';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmpjeiIsImEiOiJjazc5OW91M3UwMTEzM2ZxdTg0a3RlNHVkIn0.ebttXrA6i4iH0lxBLDGmjQ';

export default function Radar({lng, lat}: {lng: number; lat: number}) {
    const [map, setMap] = useState<mapboxgl.Map | undefined>();
    const [startTime] = useState(dayjs().valueOf());
    const [time, setTime] = useState(startTime);
    const timeIntervals = useMemo(() => getTimeIntervals(startTime), [startTime]);
    const [loopState, setLoopState] = useState<'loading'|'playing'|undefined>(undefined);
    const [loop, setLoop] = useState<NodeJS.Timeout | undefined>(undefined);
    const isMobile = useMediaQuery('(max-width: 500px)');

    async function getRadarLoop() {
        if (!map) return;
        setLoopState('loading');
        // Get a radar url for each time interval
        const radarPromises = timeIntervals.map(interval => fetch(getRadarUrl(map, interval.value)));

        await Promise.all(radarPromises);
        setLoopState('playing');
    }

    useEffect(() => {
        const innerMap = new mapboxgl.Map({
            container: 'map',
            maxZoom: 10,
            minZoom: 4,
            zoom: 7,
            center: [lng, lat],
            style: 'mapbox://styles/johnjcz/ck7t9f4aq2wuy1imokjil5qxm',
        });

        setMap(innerMap);

        innerMap.on('load', () => {
            const bounds = bufferBounds(innerMap.getBounds());

            innerMap.addSource('radar', {
                'type': 'image',
                'url': getRadarUrl(innerMap),
                'coordinates': [
                    [bounds[0], bounds[3]],
                    [bounds[2], bounds[3]],
                    [bounds[2], bounds[1]],
                    [bounds[0], bounds[1]],
                ]
            })

            innerMap.addLayer({
                'id': 'radar',
                'source': 'radar',
                'type': 'raster',
                'paint': {
                    'raster-opacity': 0.75,
                    'raster-fade-duration': 0,
                }
            },)

            innerMap.addSource('location', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat],
                        }
                    }]
                }
            })

            innerMap.addLayer({
                id: 'location',
                source: 'location',
                type: 'circle',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#4287f5',
                    'circle-opacity': 0.85,
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 2,
                    'circle-stroke-opacity': 0.85,
                }
            })

            // For some reason a small gap will appear at the bottom without this
            setTimeout(() => {
                innerMap.resize();
            }, 50);
        })

        innerMap.on('movestart', () => {
            innerMap.setPaintProperty('radar', 'raster-opacity', 0)
            if (loopState === 'playing') {
                pauseLoop();
            }
        })

        innerMap.on('moveend', async () => {
            // Hack into the loading state
            setLoopState('loading');
            const bounds = bufferBounds(innerMap.getBounds());

            const radarSource = innerMap.getSource('radar') as mapboxgl.ImageSource;
            const radarUrl = getRadarUrl(innerMap);

            await fetch(radarUrl);

            radarSource.updateImage({
                url: radarUrl,
                coordinates: [
                    [bounds[0], bounds[3]],
                    [bounds[2], bounds[3]],
                    [bounds[2], bounds[1]],
                    [bounds[0], bounds[1]],
                ]
            })
            // A delay helps prevent the illusion of the radar jumping around
            setTimeout(() => {
                innerMap.setPaintProperty('radar', 'raster-opacity', 0.75);
                setLoopState(undefined);
            }, 500);

        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!map) return;

        if (loopState === 'playing') {
            let currentInterval = 0;

            timeIntervals.forEach((interval, idx) => {
                if (interval.value === time) {
                    currentInterval = idx + 1;
                }
            });

            if (currentInterval > timeIntervals.length - 1) {
                currentInterval = 0;
            }

            setLoop(setInterval(() => {
                if (currentInterval <= timeIntervals.length - 1) {
                    (map.getSource('radar') as mapboxgl.ImageSource)
                        .updateImage({ url: getRadarUrl(map, timeIntervals[currentInterval].value)});

                    setTime(timeIntervals[currentInterval].value);
                }

                if (currentInterval === timeIntervals.length + 2) {
                    currentInterval = 0;
                } else {
                    currentInterval++;
                }

            }, 250))
        }

        if (loopState === undefined && loop) {
            pauseLoop();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loopState]);

    function pauseLoop() {
        if (!map || !loop) return;
        clearInterval(loop);
        setLoop(undefined);
        (map.getSource('radar') as mapboxgl.ImageSource)
                .updateImage({ url: getRadarUrl(map)});
    }

    function getRadarUrl(map: mapboxgl.Map, forceTime?: number) {
        const bounds = bufferBounds(map.getBounds());

        const southWest = [bounds[0], bounds[1]];
        const northEast = [bounds[2], bounds[3]];

        const params = {
            dpi: '96',
            transparent: 'true',
            format: 'png32',
            // The type defintions for URLSearchParams want all values to be strings
            time: forceTime ? `${forceTime}` : `${time}`,
            bbox: `${southWest.join(',')},${northEast.join(',')}`,
            bboxSR: '4326',
            imageSR: '4326',
            size: `${window.innerWidth},${window.innerHeight}`,
            f: 'image',
        }

        const queryString = new URLSearchParams(params).toString()
        return `https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/export?dynamicLayers=%5B%7B%22id%22%3A3%2C%22name%22%3A%22Image%22%2C%22source%22%3A%7B%22type%22%3A%22mapLayer%22%2C%22mapLayerId%22%3A3%7D%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%7D%5D&${queryString}`

    }

    function updateRadar() {
        if (!map) return;

        (map.getSource('radar') as mapboxgl.ImageSource).updateImage({
            url: getRadarUrl(map)
        });

    }

    return <div>
        <div id='map' style={{position: 'absolute', width: '100%', height: `calc(100% - ${isMobile ? '56' : '64'}px)`}}></div>
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
            marginBottom: '35px',
            paddingBottom: '8px',
            paddingTop: '8px',
            width: '325px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }}>
            <div >
                {loopState === undefined && <IconButton
                    onClick={() => getRadarLoop()}
                >
                    <PlayArrowIcon/>
                </IconButton>}
                {loopState === 'loading' && <CircularProgress size={23} style={{padding:'11px', marginRight: '10px'}}/>}
                {loopState === 'playing' && <IconButton
                    onClick={() => setLoopState(undefined)}
                >
                    <PauseIcon/>
                </IconButton>}
            </div>

            <div style={{
                width: '200px',
                marginLeft: '24px',
                marginRight: '24px',
            }}>
                <Slider
                    marks={timeIntervals}
                    defaultValue={startTime.valueOf()}
                    valueLabelDisplay='off'
                    step={900000}
                    min={dayjs(startTime).subtract(4, 'hours').valueOf()}
                    max={startTime}
                    onChange={(event, value) => {
                        setTime((value as number));
                        updateRadar();
                    }}
                    value={time}
                />
            </div>

        </div>
    </div>
}

function getTimeIntervals(startTime: number) {
    return [
        {
            value: dayjs(startTime).subtract(4, 'hours').valueOf(),
            label: dayjs(startTime).subtract(4, 'hours').format('H:mm'),
        },
        {
            value: dayjs(startTime).subtract(3.5, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(3.25, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(3, 'hours').valueOf(),
            label: dayjs(startTime).subtract(3, 'hours').format('H:mm'),
        },
        {
            value: dayjs(startTime).subtract(2.5, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(2.25, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(2, 'hours').valueOf(),
            label: dayjs(startTime).subtract(2, 'hours').format('H:mm'),
        },
        {
            value: dayjs(startTime).subtract(1.5, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(1.25, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(1, 'hours').valueOf(),
            label: dayjs(startTime).subtract(1, 'hours').format('H:mm'),
        },
        {
            value: dayjs(startTime).subtract(0.5, 'hours').valueOf(),
        },
        {
            value: dayjs(startTime).subtract(0.25, 'hours').valueOf(),
        },
        {
            value: startTime,
            label: dayjs(startTime).format('H:mm'),
        },
    ]
}

function bufferBounds(bounds: mapboxgl.LngLatBounds) {
    const [sw, ne] = bounds.toArray();

    return [
        sw[0] - 0.05,
        sw[1] - 0.05,
        ne[0] + 0.05,
        ne[1] + 0.05,
    ]
}