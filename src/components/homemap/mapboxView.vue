<template>
<div class="mapbox">
  <el-radio-group class="mapStyle" v-model="map.style" @change="changeStyle">
    <el-radio-button label="mapbox://styles/mapbox/outdoors-v10">户外地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/satellite-v9">卫星地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/dark-v9">暗黑地图</el-radio-button>
  </el-radio-group>
  <el-card class="card-box">
    <div slot="header">选项设置</div>
    <el-button type="primary" class="mapgroup" @click="changeState">按钮事件</el-button>
    <el-button type="primary" class="mapgroup" @click="changeMap">地图更改</el-button>
    <el-input class="mapgroup" >{{location.lat}}</el-input>
  </el-card>

  <div id="map-view"></div>
</div>


</template>

<script>
import mapboxgl from "mapbox-gl"
import {map,loadMap} from "../../../public/mapbox";

export default {
  name: "mapboxView",
  data(){
    return{
      map:{
        center:[121.81135905402766, 39.084797545212155],
        zoom:14,
        style:"mapbox://styles/mapbox/outdoors-v10"
      },
      location:[121.81135905402766, 39.084797545212155],
      poly:{
        edit:false
      },
    }
  },
  mounted() {
    loadMap('map-view')
    map.setZoom(15)
    const marker1=new mapboxgl.Marker().setLngLat(this.location).addTo(map)
    map.on('click',(e)=>{
      if (!this.poly.edit){
        return
      }
      this.location[0]=e.lngLat.lng
      this.location[1]=e.lngLat.lat
      console.log(marker1)
    })
  },
  methods:{
    init(){
      // map.on('click',(e)=>{
      //   if (!this.poly.edit){
      //     return
      //   }
      //   this.location[0]=e.lngLat.lng
      //   this.location[1]=e.lngLat.lat
      // });
    },

    changeMap(){
      // const marker1=new mapboxgl.Marker().setLngLat(this.location).addTo(map)
      // console.log(marker1)
      // // map.setStyle('mapbox://styles/mapbox/satellite-v9')
      // console.log(1121)
      this.location=[]
    },
    //改变状态
    changeState(){
      this.poly.edit=!this.poly.edit
      console.log(this.location)
    },
    //改变地图样式
    changeStyle(){
      map.setStyle(this.map.style)
      console.log(this.map.style)
    }


},
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
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-left: 20px;
  margin-top: 20px;
}
</style>
