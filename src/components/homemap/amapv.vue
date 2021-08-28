<template>
  <div class="mapbox">
    <el-container>
      <h1>测试内容</h1>
    </el-container>

    <el-amap  id="amap-el" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" @click="getPoint">

      <el-amap-marker @click="clickoutside"></el-amap-marker>
    </el-amap>
  </div>

</template>

<script>
import VueAMap from "vue-amap/src/lib";

let amapManager = new VueAMap.AMapManager();
export default {
  name: "amap",
  data(){
    return{
      center: [  121.83206, 39.084716],
      zoom:15,
      amapManager,
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
#amap-el{
  height: 80%;
}
.el-container{
  height: 20%;
}

</style>
