<template>
<div>
  <el-button type="primary" @click="add">
    添加按钮
  </el-button>
</div>
</template>

<script>
export default {
  name: "mapComponent",
  data(){
    return{
      map:''
    }
  },
  methods:{
    add(){
      //访问地图信息
      this.$store.getters.getMap
      // this.map.addControl(new this.map.NavigationControl())
    }
  }
}
</script>

<style scoped>

</style>
