<template>
  <div id="mapsetting">
    <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group>
<!--    <map-component></map-component>-->
<!--    <editandplan></editandplan>-->
    <buttonpage :editFtButton="editFtButton" @placeUser="addUserMarker" @placeDepot="addDepotMarker"></buttonpage>
    <mission-start></mission-start>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {mapMutations} from "vuex";
import MissionStart from "@/components/homemap/missionStart";
import Buttonpage from "@/components/homemap/buttonpage";
let map=null
let layers = null
export default {
  name: "leaflet",
  components: {Buttonpage, MissionStart },
  data(){
    return{
      // map:''
      // 地图类型
      mapId:'mapbox/streets-v11',
      editFtButton:{
        placeUserPoint:false,
        place:"sfdjkl"
      }
    }
  },
  mounted() {
    map = this.$map.newMap("map",{
      minZoom: 0,
      maxZoom: 20,
      zoomControl: false,
      attributionControl: false,
      //坐标系选择
      crs: L.CRS.EPSG3857
    })
    layers = this.$map.createLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: this.mapId,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
    })
    L.control.zoom({position:'topright'}).addTo(map)
    L.control.attribution({
      position:'bottomright',
      prefix:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}).addTo(map)
    map.setView([ 39.082324815761126,121.81149363525782],16)
  },
  methods:{
    ...mapMutations(['initleaflet']),
    initMap() {
      //载入地图，使用vuex保存状态
      this.initleaflet(map)
    },
    changeStyle(){
      map.removeLayer(layers)
      this.$map.changeLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        // zoomOffset 注释掉会出大问题
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      })
    },
    addUserMarker(){
      this.editFtButton.placeUserPoint=!this.editFtButton.placeUserPoint
      let uavIcon = this.$map.createIcon({iconUrl: '/leaflet/mobile.png'})
      map.on('click',(e)=>{
        if (!this.editFtButton.placeUserPoint){
          console.log("status:  "+this.editFtButton.placeUserPoint)
          return
        }
        console.log(e.latlng)
        this.$map.createMarker(map,e.latlng,{icon:uavIcon,title:"uav 0"})
      })
    },
    addDepotMarker(){}
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
