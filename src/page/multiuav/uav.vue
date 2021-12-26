<template>
<el-container>
  <div id="map"></div>
</el-container>
</template>

<script>
import L from "@/components/homemap/leaflet";
import 'leaflet/dist/leaflet.css'

export default {
  name: "uav",
  data(){
    return{
      map:null,
    }
  },
  mounted() {

  },
  methods:{
    initMap() {
      let map = L.map("map", {
        minZoom: 3,
        maxZoom: 14,
        center: [39.550339, 116.114129],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      });
      this.map = map;
      window.map = map;
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      }).addTo(map);
    },
  },
}
</script>

<style scoped>
.div{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 300px;
  background: #409eff;
}
#map {
  width: 500px;
  height: 500px;
  background: #409eff;

}
</style>
