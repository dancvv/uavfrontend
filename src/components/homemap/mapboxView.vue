<template>
<div class="mapbox">
  <el-radio-group class="mapStyle" v-model="map.style" @change="changeMap">
    <el-radio-button label="mapbox://styles/mapbox/streets-v9" size="medium" >平面地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/satellite-v9" size="medium" >卫星地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/outdoors-v10" size="medium" >户外地图</el-radio-button>
  </el-radio-group>
  <el-card class="card-box">
    <div slot="header">选项设置</div>
    <el-button type="primary" class="mapgroup" @click="placePoint">{{poly.edit?'停止绘制':'开始绘制'}}</el-button>
    <el-button type="primary" class="mapgroup" @click="changeMap">地图更改</el-button>
    <el-input class="mapgroup" >{{location.lat}}</el-input>
  </el-card>

  <div id="map-view"></div>
</div>


</template>

<script>
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
let map=null
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
      poly:{
        paths:[],
        edit:false
      },
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
       map=new mapboxgl.Map({
        container: 'map-view',
        style: this.map.style,
        center: this.map.center,
        zoom: this.map.zoom,
      });
      // element marker元素
      let el=document.createElement('div')
      el.className='marker'
      el.style.backgroundImage='`url(/public/uav48.svg)`'
      el.style.width='48px'
      el.style.height='48px'
      el.style.backgroundSize = '100%';
      new mapboxgl.Marker(el).setLngLat(this.location).addTo(map)
      map.on('click',(e)=>{
        if (!this.poly.edit){
          return
        }
        //临时位置数组
        let temp=[]
        temp[0]=e.lngLat.lng
        temp[1]=e.lngLat.lat
        console.log(temp)
        this.poly.paths.push(e.lngLat)
        console.log(this.poly.paths)
        //根据点击位置放置一个图标
        new mapboxgl.Marker(el).setLngLat(temp).addTo(map)
      });
      map.setStyle(this.map.style)
      console.log(this.map.style)
      map.on('load',()=>{
        map.setStyle(this.map.style)
      })
      map.addControl(new mapboxgl.NavigationControl())
      return map;
    },

    async changeMap() {
      // const map=this.init()
      const {data: res} = await this.$http.post('compute/depotData', this.poly.paths)
      console.log(res)
      map.setStyle(this.map.style)
      console.log(this.map.style)
    },
    placePoint(){
      this.poly.edit=!this.poly.edit
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
  margin-top: 20px;
  margin-left: 20px;
}
</style>
