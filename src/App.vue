<template>
  <div id="app">
    <div class="mapbox">
      <el-radio-group v-model="map.style">

      </el-radio-group>
      <el-radio-group class="mapTypeGroup" v-model="map.style">
        <el-radio-button label="mapbox://styles/mapbox/streets-v9" size="medium">{{ map.style }}</el-radio-button>
        <el-radio-button label="mapbox://styles/mapbox/satellite-v9" size="medium">卫星地图</el-radio-button>
      </el-radio-group>
    </div>
    <button type="button" value="12">卫星地图</button>
    <div id="mapbox"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import {onMounted, reactive} from "vue";
// import {onMounted} from "vue";
export default {
  name: 'App',
  components: {
  },
  data(){
    return{

    }
  },
  props: {
    title: String
  },
  setup(props){
    console.log(props)
    const map=reactive({
      center:[121.81135905402766, 39.084797545212155],
      zoom:14,
      style:"mapbox://styles/mapbox/satellite-v9"
    })
    let location=[121.81135905402766, 39.084797545212155]
    const style="mapbox://styles/mapbox/streets-v9"
    onMounted(()=>{
      init()
    })
    let init=()=>{

      const mapbox=new mapboxgl.Map({
        container: 'mapbox',
        style: map.style,
        center: map.center,
        zoom: map.zoom,
      });
      console.log(mapbox)
      const marker1=new mapboxgl.Marker().setLngLat(location).addTo(mapbox)
      mapbox.on('click',(e)=>{
        console.log(e)
        console.log(map.style)

        location[0]=e.lngLat.lng
        location[1]=e.lngLat.lat
        marker1.setLngLat(location)
      });
      mapbox.setStyle(map.style)
      // console.log(this.map.style)
      // mapbox.on('load',()=>{
      //   mapbox.setStyle(this.map.style)
      // })
    }
    return{
      init,
      location,
      style,
      map
    }

  }
}
</script>

<style>
#app {
  height: 800px;
  background-color: #42b983;
}
#mapbox{
  height: 100%;
  background-color: tomato;
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
