<template>
  <el-container>
    <!--  一级菜单下的二级菜单-->
    <el-aside>
    </el-aside>

    <!--  以及二级菜单所对应的页面-->
    <el-main class="el-main-box">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// import SideMenu from "@/components/sideMenu/SideMenu";
export default {
  name: "uavindex",
  // components: {SideMenu},
  data(){
    return{
      items: [
        {
          index: 'leaflet',
          title: '二级菜单1-1'
        },
        {
          index: 'test1-2',
          title: '二级菜单1-2'
        },
        {
          index: 'test1-3',
          title: '二级菜单1-3'
        },
        {
          index: 'test1-4',
          title: '二级菜单1-4'
        },
        {
          index: 'test1-5',
          title: '二级菜单1-5'
        }
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      console.log("push something")
    }
  }
}
</script>

<style scoped>
.el-main-box{
  margin: 0px;
  padding: 0px;
}
</style>
