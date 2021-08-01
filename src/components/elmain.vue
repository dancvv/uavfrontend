<template>
  <div>
    <el-main>
      <div id="app">
        <amap :zoom="18" :center="position1">
          <amap-marker
              :position="position1"
              :offset="[-22, -40]"
              :label="{
          // content: '使用自定义Icon的Marker',
          direction: 'bottom',
        }"
              :icon="uavIcon"
          />
              draggable
          />
        </amap>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "elmain",
  data() {
    return {
      position1: [121.81206,39.084716]
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
