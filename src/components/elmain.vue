<template>
  <div>
    <el-main>
      <div id="app">
        <amap :zoom="16" :center="position4">
          <amap-marker
              :position="position1"
              :offset="[-22, -40]"
              :label="{
          // content: '使用自定义Icon的Marker',
          direction: 'bottom',
        }"
              :icon="uav.icon"
          />
          <amap-marker
              :position="position2"
              :offset="[-22, -40]"
              :label="{
          // content: '使用自定义Icon的Marker',
          direction: 'bottom',
        }"
              :icon="uav.icon"
          />
          <amap-marker
              :position="position3"
              :offset="[-22, -40]"
              :label="{
          // content: '使用自定义Icon的Marker',
          direction: 'bottom',
        }"
              :icon="uav.icon"
          />
          <amap-marker
              :position="position4"
              :offset="[-22, -40]"
              :label="{
          // content: '使用自定义Icon的Marker',
          direction: 'bottom',
        }"
              :icon="uav.icon"
          />
              draggable
          />
        </amap>
      </div>
    </el-main>
  </div>
</template>

<script>
import uavIcon from "/public/uav.png"
export default {
  name: "elmain",
  data() {
    return {
      position1: [121.81206,39.084716],
      position2: [121.81300,39.08371],
      position3: [121.822,39.0847],
      position4: [121.818,39.083],
      uav: {


        icon: {
          image: uavIcon,
          imageSize: [50, 60],
        },
        offset: [-13, -25],
      },
    };
  }
}
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 900px;
  height: 490px;
}
</style>
