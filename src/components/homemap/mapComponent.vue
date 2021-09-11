<template>
<div>
<!--  <el-button type="primary" @click="add">添加按钮</el-button>-->
  <el-button type="primary" @click="add2">加法</el-button>
<!--  <el-button type="primary" @click="add3">添加按钮</el-button>-->
</div>
</template>

<script>
// let map='';
export default {
  name: "mapComponent",
  data(){
    return{
      // map:''
    }
  },
  mounted() {
    this.add()
  },
  methods:{
    add(){
      //访问地图信息
      // map=this.$store.getters.getMap
      // map.addControl(new map.NavigationControl)

      // this.map.addControl(new this.map.NavigationControl())
    },
    add2(){
      this.$store.commit('addmethod')
      console.log(this.$store.getters.getCount)
    },

  },
  computed:{
    // add3(){
    //   console.log(this.$store.getters.getCount)
    //   return this.$store.getters.getCount
    // }
  }
}
</script>

<style scoped>

</style>
