<template>
<div id="demo">

  <el-amap class="amap-box" :vid="'amap-vue'" :center="pos" :zoom="15">
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
    },
    clickChange(){
      for(let i=0; i<20; i++){
        setTimeout(()=>{
          this.pos.lng=this.pos.lng+0.0001
          this.pos.lat=this.pos.lat+0.0001
        },1000)
      }
    },
  }
}
</script>

<style scoped>
#demo{
  height: 100%;
  background-color: palevioletred;
}
</style>
