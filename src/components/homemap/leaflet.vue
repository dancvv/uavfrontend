<template>
  <div id="mapsetting">
    <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group>
    <map-component></map-component>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapComponent from "@/components/homemap/mapComponent";
import {mapMutations} from "vuex";

let map=null
export default {
  name: "leaflet",
  components: {MapComponent},
  data(){
    return{
      // map:''
      // 地图类型
      mapId:'mapbox/streets-v11'
    }
  },
  mounted() {
    this.initMap()
  },
  methods:{
    ...mapMutations(['initleaflet']),
    initMap() {
      map = L.map("map", {
        minZoom: 0,
        maxZoom: 20,
        center: [ 39.082324815761126,121.81149363525782],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
        //坐标系选择
        crs: L.CRS.EPSG3857
      });
      //载入地图
      this.initleaflet(map)
      // this.map = map;//data上需要挂载
      // window.map = map;
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      }).addTo(map);
    },
    changeStyle(){
      console.log(this.mapId)
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        // zoomOffset 注释掉会出大问题
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      }).addTo(map);
    }
  }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 0;
  /*background-color: #409EFF;*/
}
#mapsetting{
  height: 100%;
}
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
