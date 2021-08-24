<template>
  <l-map style="height: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
<!--    放大缩小位置放置底部-->
    <l-control-zoom position="bottomright"></l-control-zoom>
    <l-marker :latlng="center" :icon="markerIcon"></l-marker>

  </l-map>
</template>

<script>

export default {

  name: "leafmap",
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [   39.084716,121.83206],
      markerLatLng: [51.504, -0.159],
      markerIcon:'uav48.svg',
    };
  },
  created() {

  }
}
</script>

<style scoped>
.map{
  height: 100%;
}
</style>
