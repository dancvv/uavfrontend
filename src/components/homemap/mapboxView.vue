<template>
<div id="map-view">
  <el-container>

    <el-button type="primary">测试</el-button>
    <h1>ew</h1>
  </el-container>
</div>
</template>

<script>
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: "mapboxView",
  mounted() {
    return new mapboxgl.Map({
      container: 'map-view',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [120.57229, 31.28505],
      zoom: 9,
    });
  },
  methods:{
    init(){

    }
  }
}
</script>

<style scoped>
#map-view{
  height: 100%;
}
</style>