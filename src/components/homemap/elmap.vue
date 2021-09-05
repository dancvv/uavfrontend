<template>
<el-container class="body">
  <el-amap class="map" vid="amapDemo" :zoom="15" :center="position">
    <el-marker :position="position"></el-marker>
  </el-amap>
</el-container>
</template>

<script>
export default {
  name: "elmap",
  data(){
    return{
      position: [121.5273285, 31.21515044]
    }
  }
}
</script>

<style scoped>
.body{
  height: 100%;
  background-color: greenyellow;
}
.map{
  height: 100%;
  width: 100%;
  background-color: tomato;
}

</style>
