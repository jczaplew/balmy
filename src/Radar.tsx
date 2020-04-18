import React, {useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmpjeiIsImEiOiJjazc5OW91M3UwMTEzM2ZxdTg0a3RlNHVkIn0.ebttXrA6i4iH0lxBLDGmjQ';


export default function Radar() {
    const [map, setMap] = useState<mapboxgl.Map | undefined>();

    useEffect(() => {
        const innerMap = new mapboxgl.Map({
            container: 'map',
            maxZoom: 12,
            minZoom: 4,
            zoom: 10,
            center: [-93.20523, 44.94776],
            // center: [-99.12137, 41.33868],
            style: 'mapbox://styles/johnjcz/ck7t9f4aq2wuy1imokjil5qxm',
            hash: true
        });

        setMap(innerMap);

        innerMap.on('load', () => {
            const bounds = innerMap.getBounds()

            innerMap.addSource('radar', {
                'type': 'image',
                'url': getRadarUrl(innerMap),
                'coordinates': [
                    bounds.getNorthWest().toArray(),
                    bounds.getNorthEast().toArray(),
                    bounds.getSouthEast().toArray(),
                    bounds.getSouthWest().toArray(),
                ]
            })

            innerMap.addLayer({
                'id': 'radar',
                'source': 'radar',
                'type': 'raster',
                'paint': { 'raster-opacity': 0.75 }
            },)

        })

        innerMap.on('movestart', () => {
            innerMap.setPaintProperty('radar', 'raster-opacity', 0.1)
        })

        innerMap.on('moveend', () => {
            const bounds = innerMap.getBounds();
            const radarSource = innerMap.getSource('radar') as mapboxgl.ImageSource;

            radarSource.updateImage({
                url: getRadarUrl(innerMap),
                coordinates: [
                    bounds.getNorthWest().toArray(),
                    bounds.getNorthEast().toArray(),
                    bounds.getSouthEast().toArray(),
                    bounds.getSouthWest().toArray(),
                ]
            })
            innerMap.setPaintProperty('radar', 'raster-opacity', 0.75)

        })

    }, []);

    function getRadarUrl(map: mapboxgl.Map, time?: number) {

        const bounds = map.getBounds().toArray()
        const southWest = bounds[0]
        const northEast = bounds[1]

        const params = {
            dpi: '96',
            transparent: 'true',
            format: 'png32',
            // The type defintions for URLSearchParams want all values to be strings
            time: time ? `${time}` : `${new Date().getTime()}`,
            bbox: `${southWest.join(',')},${northEast.join(',')}`,
            bboxSR: '4326',
            imageSR: '4326',
            size: `${window.innerWidth},${window.innerHeight}`,
            f: 'image',
        }

        const queryString = new URLSearchParams(params).toString()
        return `https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/export?dynamicLayers=%5B%7B%22id%22%3A3%2C%22name%22%3A%22Image%22%2C%22source%22%3A%7B%22type%22%3A%22mapLayer%22%2C%22mapLayerId%22%3A3%7D%2C%22minScale%22%3A0%2C%22maxScale%22%3A0%7D%5D&${queryString}`

    }

    function updateRadar(time: number) {
        if (!map) return;
        const radarUrl = getRadarUrl(map, time);

        const radarSource = map.getSource('radar') as mapboxgl.ImageSource;

        radarSource.updateImage({url: radarUrl})

    }

    const now = moment();

    const marks = [
        {
            value: moment(now).subtract(4, 'hours').valueOf(),
            label: moment(now).subtract(4, 'hours').format('H:mm'),
        },
        {
            value: moment(now).subtract(3.5, 'hours').valueOf(),
        },
        {
            value: moment(now).subtract(3, 'hours').valueOf(),
            label: moment(now).subtract(3, 'hours').format('H:mm'),
        },
        {
            value: moment(now).subtract(2.5, 'hours').valueOf(),
        },
        {
            value: moment(now).subtract(2, 'hours').valueOf(),
            label: moment(now).subtract(2, 'hours').format('H:mm'),
        },
        {
            value: moment(now).subtract(1.5, 'hours').valueOf(),
        },
        {
            value: moment(now).subtract(1, 'hours').valueOf(),
            label: moment(now).subtract(1, 'hours').format('H:mm'),
        },
        {
            value: moment(now).subtract(0.5, 'hours').valueOf(),
        },
        {
            value: now.valueOf(),
            label: now.format('H:mm'),
        },
    ]
    console.log(marks)
    return <div>
        <div id='map' style={{position: 'absolute', top: 0, bottom: 0, width: '100%'}}></div>
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
            marginBottom: '16px',
            paddingBottom: '8px',
            paddingTop: '16px',
            paddingRight: '32px',
            paddingLeft: '32px',
            width: '250px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: '6px',
        }}>
            <Slider
                marks={marks}
                defaultValue={now.valueOf()}
                valueLabelDisplay='off'
                step={1800000}
                min={moment(now).subtract(4, 'hours').valueOf()}
                max={now.valueOf()}
                onChangeCommitted={(event, value) => {
                    updateRadar((value as number))
                }}
            />
        </div>
    </div>
}