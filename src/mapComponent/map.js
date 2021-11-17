import "leaflet/dist/leaflet.css"
import L from "leaflet"

//创建map容器，
const newMap = (domId,Option) => {
    return L.map(domId, Option)
}

const createLayers = async (map, url, option) => {
    let mapLayer = await L.tileLayer(url, option);
    mapLayer.addTo(map);
    return mapLayer
}

const changeLayers = async (map, url, option) => {
    let changeMapLayers = await L.tileLayer(url, option);
    changeMapLayers.addTo(map);
    return changeMapLayers
}

//创建图标
const createIcon = () => {
    return L.Icon.extend({
        options:{
            iconSize:     [36, 36],
            shadowSize:   [0, 0],
            iconAnchor:   [18, 30],
        }
    });
}

//创建marker对象

const createMarker = (map,coordinates,options) => {
    let marker = L.marker(coordinates,options)
    marker.addTo(map)
    return marker;
}


export default {
    newMap,
    createLayers,
    changeLayers,
    createIcon,
    createMarker,
}
