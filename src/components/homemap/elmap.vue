<template>
  <div class="body">
    <el-button type="primary" size="mini" class="card-edit">按钮</el-button>
    <el-container class="body">
      <el-amap class="map" vid="amapDemo" :zoom="15" :center="position">
        <el-amap-marker :position="position"></el-amap-marker>
      </el-amap>
    </el-container>
  </div>
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
.card-edit{
  position: absolute;
  margin-top: 60px;
  margin-left: 20px;
  /*width: 300px;*/
  z-index:1
}
</style>
