import "leaflet/dist/leaflet.css"
import L from "leaflet"

//创建map容器，
const newMap = (domId,Option) => {
    return L.map(domId, Option)
}

const createLayers = (map,url,option) => {
    let mapLayer = L.tileLayer(url,option);
    mapLayer.addTo(map);
    return mapLayer
}

const changeLayers = (map,url,option) => {
    let realMapLayers = L.tileLayer(url,option);
    realMapLayers.addTo(map);
    return realMapLayers
}

export default {
    newMap,
    createLayers,
    changeLayers
}
