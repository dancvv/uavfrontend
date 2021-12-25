<template>
<div>
<!--  一级菜单下的二级菜单-->
  <el-aside>
    <SideMenu :items="items"></SideMenu>
  </el-aside>

<!--  以及二级菜单所对应的页面-->
  <el-main>
    <router-view></router-view>
  </el-main>
</div>
</template>

<script>
import SideMenu from "@/components/sideMenu/SideMenu";
export default {
  name: "uavindex",
  components: {SideMenu},
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
  }
}
</script>

<style scoped>

</style>
