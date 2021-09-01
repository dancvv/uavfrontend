<template>
<div class="mapbox">
  <el-radio-group class="mapTypeGroup" v-model="map.style" @click="changeMap(2)">
    <el-radio-button label="mapbox://styles/mapbox/streets-v9" size="medium" @click="changeMap">平面地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/satellite-v9" size="medium" @click="changeMap">卫星地图</el-radio-button>
  </el-radio-group>
  <el-card class="card-box">
    <div slot="header">选项设置</div>
    <el-button type="primary" class="mapgroup">按钮事件</el-button>
    <el-input class="mapgroup" >{{location.lat}}</el-input>
  </el-card>

  <div id="map-view"></div>
</div>


</template>

<script>
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: "mapboxView",
  data(){
    return{
      map:{
        center:[121.81135905402766, 39.084797545212155],
        zoom:14,
        style:"mapbox://styles/mapbox/streets-v9"
      },
      location:[121.81135905402766, 39.084797545212155],
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      const map=new mapboxgl.Map({
        container: 'map-view',
        style: this.map.style,
        center: this.map.center,
        zoom: this.map.zoom,
      });
      const marker1=new mapboxgl.Marker().setLngLat(this.location).addTo(map)
      map.on('click',(e)=>{
        this.location[0]=e.lngLat.lng
        this.location[1]=e.lngLat.lat
        marker1.setLngLat(this.location)
      });
      map.setStyle(this.map.style)
    },
    changeMap(){
      console.log(this.map.style)

    }
  }
}
</script>

<style scoped>
.mapbox{
  height: 100%;
}
#map-view{

  height: 100%;
  z-index: 0;
}
.card-box{
  position: absolute;
  margin-top: 60px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
  margin-bottom: 10px;
}
.mapTypeGroup{
  position: absolute;
  z-index: 1;
  margin-top: 20px;
}
</style>