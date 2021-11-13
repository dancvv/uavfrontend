import L from "leaflet"

const newMap = (domId,Option) => {
    return L.map(domId, Option)
}

const createLayers = (map,url,option) =>{
    let mapLayer = L.tileLayer(url,option);
    mapLayer.addTo(map)
    return mapLayer
}

export default {
    newMap,
    createLayers,
}
