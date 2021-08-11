<template>
<div id="demo">

  <el-amap class="amap-box" :vid="'amap-vue'" :center="[121.81206,39.084716]" :zoom="16">

    <el-col>
      <el-button type="primary" @click="pop">按键测试</el-button>
    </el-col>

    <el-amap-marker :position="pos" :icon="require('/public/无人机.svg')"></el-amap-marker>
  </el-amap>
</div>
</template>

<script>
export default {
  name: "lessmap",
  data(){
    return{
      pos:[121.81206,39.084716]
    }
  },

  methods:{
    pop(){
      console.log("dianji")
      alert(this.refs.$$getPosition())
    }
  }
}
</script>

<style scoped>
#demo{
  height: 100%;
  background-color: palevioletred;
}
</style>
