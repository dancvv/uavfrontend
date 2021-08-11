<template>
<div id="mapview">
  <amap :zoom="16" :center="position1" >
    <el-row >
      <el-button >按键测试</el-button>
    </el-row>
    <amap-marker :position="position1"  :label="{direction:'bottom',content:'empty'}"/>
  </amap>
</div>
</template>

<script>
// import {Amap.Icon} from '@amap/amap-vue'
import uavIcon from "/public/uav.png"
export default {
  name: "mapview",
  data: function () {
    return {
      position1: [121.81206, 39.084716],
      uav: {
        icon: {
          image: uavIcon,
          imageSize: [50, 60],
        },
      }
    }
  },}
</script>

<style scoped>
#mapview{
  height: 100%;
  background-color: rebeccapurple;
}
</style>
