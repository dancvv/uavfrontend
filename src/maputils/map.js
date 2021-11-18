import "leaflet/dist/leaflet.css"
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

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

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


//创建图标
const createIcon = (options) => {
    return L.icon(options);
  };


//创建marker对象
const createMarker = (coordinates,options) => {
    return L.marker(coordinates, options);
}


export default {
    newMap,
    createLayers,
    changeLayers,
    createIcon,
    createMarker,
}
