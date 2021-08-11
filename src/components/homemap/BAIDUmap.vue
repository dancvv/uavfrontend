<template>



      <baidu-map class="map" :center="{lng: 116.666, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true">
        <bm-control>
          <el-button>按键测试</el-button>
        </bm-control>
        <bm-marker :position="pos" draggable="true"></bm-marker>
        <bm-marker :position="pos1" draggable="true" :icon="uicon"></bm-marker>
      </baidu-map>





</template>

<script>
import ticon from "/public/无人机.svg"
import mapstyle from "/src/assets/style/custom_map_config.json"
export default {
  name: "BAIDUmap",
  data(){
    return{
      style:mapstyle,
      ticon,
      pos:{lng: 116.666, lat: 39.915},
      pos1:{lng: 116.657, lat: 39.915},
      uicon:{
        url:require('/public/无人机.svg'),
        size: {width: 36, height: 36}
      },
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
#local{
  height: 100%;
  background-color: palevioletred;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
