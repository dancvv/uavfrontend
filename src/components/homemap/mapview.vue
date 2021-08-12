<template>
<div id="mapview">


  <amap :zoom="16" :center="position1" >

    <el-row >
      <el-popover
          ref="popover-click"
          placement="bottom"
          title="标题"
          width="200"
          trigger="click"
          content="这是click 激活。"
      >
      </el-popover>
      <el-button type="primary">click 激活</el-button>
      <el-button >按键测试</el-button>
    </el-row>
    <amap-marker :position="position1"  :label="{direction:'bottom',content:'empty'}" :icon="uav.icon" v-popover:popover-click @click="onHand"/>
  </amap>
</div>
</template>

<script>
// import {Amap.Icon} from '@amap/amap-vue'
import uavIcon from "/public/uav.svg"
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
  },
  methods:{
    onHand(){
      console.log("a")
    }
  }
}
</script>

<style scoped>
#mapview{
  height: 100%;
  background-color: rebeccapurple;
}
</style>
