<template>
  <div class="mapbox">

    <el-amap id="amap-el" vid="amapDemo" :center="center" :zoom="zoom" @click="getPoint">
      <el-amap-circle :center="center" :radius="1"></el-amap-circle>
      <el-amap-marker @click="clickoutside"></el-amap-marker>
    </el-amap>
  </div>

</template>

<script>
export default {
  name: "amap",
  data(){
    return{
      center: [  121.83206, 39.084716],
      zoom:15
    }
  },
  methods:{
    getPoint(e){
      console.log(e)
      alert("output")
      console.log(e.point)
    },
    clickoutside(e){
      alert("output")
      console.log(e.point)
    }
  }
}
</script>

<style scoped>
.mapbox{
  height: 100%;
  width: 100%;
  background-color: tomato;
}

</style>
