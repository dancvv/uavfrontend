import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
export var map;
mapboxgl.accessToken='pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'

export function loadMap(box) {
    map = new mapboxgl.Map({
        container: box,
        style: 'mapbox://styles/mapbox/outdoors-v10',
        center: [121.81135905402766, 39.084797545212155], // 设置地图中心
        zoom: 8, // 设置地图比例
        maxZoom: 17

    });
    // 设置语言
}

