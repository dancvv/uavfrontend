<template>
  <div>
    <!--  头部-->
<!--    <Header :isAsideCollapse="isAsideCollapse"/>-->
    <!--  侧边栏-->
    <el-aside :width=" isAsideCollapse ? '64px' : '200px'">
      <el-menu class="el-menu-vertical-demo"
               text-color="#666"
               active-text-color="#409eff"
               :router="true"
               unique-opened
               :collapse="isAsideCollapse"
               default-active="welcomepage"
               :collapse-transition="false">
        <el-menu-item index="leaflet">
          <i class="el-icon-map-location"></i>
          <span slot="title">可视化路线管理</span>
        </el-menu-item>
        <el-menu-item index="uavdetail">
          <i class="el-icon-s-platform"></i>
          <span slot="title">无人机控制</span>
        </el-menu-item>
        <el-submenu :index="item.path" v-for="item in asideMenu" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <!--            二级菜单-->
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
            <span slot="title">{{subItem.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Aside",
  props: ['isAsideCollapse'],
  data(){
    return{
      //判断是否合并
      // isAsideCollapse:false,
      iconObj:{
        100: 'el-icon-map-location',
        200: 'el-icon-s-cooperation',
        300: 'el-icon-s-goods',
        400: 'el-icon-s-order',
        500: 'el-icon-s-data'
      },
      //菜单数据
      asideMenu:[
        // {id:'100',path:'/leaflet',name:'首页',order:1,icon:'el-icon-user'},
        {id:'200',path:'/manage',name:'飞行参数设置',order:1,icon:'el-icon-s-cooperation',
          children:[
            {id:'201',path:'/location',name:'任务位置信息',order:2},
            {id:'202',path:'/geofence',name:'地理围栏',order:2},
          ]},
        {id:'300',path:'/mission',name:'任务执行',order:1,icon:'el-icon-s-goods',
          children: [
            {id:'301',path:'/current',name:'当前路线',order:2},
            {id:'302',path:'/video',name:'实时画面',order:2},
            {id:'303',path:'/edit',name:'路线更改',order:2},
          ]},
        {id:'400',path:'/status',name:'数据分析',order:1,icon:'el-icon-s-order',
          children: [
            {id:401,path:'/device',name:'设备管理',order:2}
          ]},
        {id:'500',path:'/setting',name:'设置',order:1,icon:'el-icon-s-data',
          children: [
            {id:'501',path:'/lad',name:'无人机参数设置'},
            {id:'502',path:'/laa',name:'用户设置'},
            {id:'503',path:'/版本信息',name:'版本信息'},
          ]},
      ],
    }
  },
  methods:{


  }
}
</script>

<style scoped>

.el-menu{
  border-right:none;
  background-color: #ffffff;
  font-size: 15px;
}

.el-menu-item{
  font-size: 13px;
  min-width: 64px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.el-aside{
  background-color:#ffffff;
}
.toggle-button{
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  font-family: "Microsoft YaHei";
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu-item{
  min-width: 64px;
}

::v-deep.el-submenu.is-active > .el-submenu__title {
  color: #409eff !important;
}
::v-deep .el-submenu.is-active > .el-submenu__title i {
  color: #409eff !important;
}
</style>
