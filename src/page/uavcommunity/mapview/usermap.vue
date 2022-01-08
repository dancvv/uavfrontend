<template>
    <div id="mapsetting">
    <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group>
<!--    <map-component></map-component>-->
<!--    <editandplan></editandplan>-->
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton'
let map=null
let layers = null
export default {
    data(){
        return{
            mapId:'mapbox/streets-v11',
        }
    },
    methods:{
     mapInitialize(){
      map = this.$maputils.map.newMap("map",{
        minZoom: 0,
        maxZoom: 20,
        zoomControl: false,
        attributionControl: false,
        //坐标系选择
        crs: L.CRS.EPSG3857
      }).fitWorld();
      layers = this.$maputils.map.createLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
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
      // 定位功能
      this.locateYou();
      L.easyButton('<span class="star">&starf;</span>', function(btn, map){
          var antarctica = [-77,70];
          map.setView(antarctica);
      }).zoom({position:'bottomright'}).addTo( map );
    },
    // 定位函数，显示定位成功与否
    locateYou(){
      map.on('locationfound',this.onLocationFound)
      map.on('locationerror',this.onLocationError)
      map.locate({setView:true,maxZoom:15})
    },
    onLocationFound(e){
      let radius=e.accuracy/2;
      let userMarker=L.marker(e.latlng).bindPopup('当前定位精度:'+radius+'m').openPopup()
      let userCircle=L.circle(e.latlng,radius)
      let locateGroup=L.layerGroup([userMarker,userCircle])
      locateGroup.addTo(map)
    },
    onLocationError(e){
      this.$message.error(e.message)
    },
    changeStyle(){
      map.removeLayer(layers)
      this.$maputils.map.changeLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        // zoomOffset 注释掉会出大问题
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      })
    },
  },
  mounted() {
    // 初始化地图
      this.mapInitialize();
    },
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 0;
  background: bisque;
  /*background-color: #409EFF;*/
}
#mapsetting{
  height: 100%;
  background: whitesmoke;
}
.mapStyle{
  position: absolute;
  z-index: 0;
  margin-top: 20px;
  margin-left: 20px;
}
.target{
  font-size: 1.5em;
} 

</style>