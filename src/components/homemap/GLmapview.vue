<template>
<div>
  <h1>测试</h1>
  <el-bmap ref="map" :lazy="2000" vid="bmapDemo" :min-zoom="10" :max-zoom="22"
           :tilt="tilt" :heading="heading"
           :center="center" :zoom="zoom" class="bmap-demo">
    de
  </el-bmap>
</div>
</template>

<script>
export default {
  name: "GLmapview",
  data(){
    return{
      zoom: 16,
      center: [121.59996, 31.197646],
      tilt: 60,
      heading: 0,
      timer: null,
    }
  }
}
</script>

<style scoped>
.bmap_container{
  height: 100%;
}
</style>