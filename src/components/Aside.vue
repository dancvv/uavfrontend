<template>
<div>
<!--  头部-->
  <Header/>
<!--  侧边栏-->
  <el-aside width="180px">
    <el-menu text-color="#666" active-text-color="#ffd04b" :router="true"
             unique-opened :collapse="isCollapse" default-active="mapview" :collapse-transition="false">
      <el-menu-item index="mapview">
        <i class="el-icon-user"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="mapboxgl">
        <i class="el-icon-user"></i>
        <span slot="title">MAPBOX</span>
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

import Header from "@/components/Header";
export default {
  name: "Aside",
  components: {Header},
  data(){
    return{
      //判断是否合并
      isCollapse:false,
      iconObj:{
        100: 'el-icon-user',
        200: 'el-icon-s-cooperation',
        300: 'el-icon-s-goods',
        400: 'el-icon-s-order',
        500: 'el-icon-s-data'
      },
      //菜单数据
      asideMenu:[
        // {id:'100',path:'/',name:'首页',order:1,icon:'el-icon-user'},
        {id:'200',path:'/manage',name:'飞行器位置',order:1,icon:'el-icon-s-cooperation',
          children:[
            {id:'201',path:'/location',name:'批量上传位置',order:2},
            {id:'202',path:'/fence',name:'地理围栏',order:2},
            {id:'203',path:'/basemap',name:'地图底图',order:2},
          ]},
        {id:'300',path:'/mission',name:'任务管理',order:1,icon:'el-icon-s-goods',
          children: [
            {id:'301',path:'/current',name:'当前路线',order:2},
            {id:'302',path:'/add',name:'路线添加',order:2},
            {id:'303',path:'/edit',name:'路线更改',order:2},
          ]},
        {id:'400',path:'/status',name:'飞行器状态',order:1,icon:'el-icon-s-order',
          children: [
            {id:401,path:'/device',name:'设备管理',order:2}
          ]},
        {id:'500',path:'/setting',name:'设置',order:1,icon:'el-icon-s-data',
          children: [{id:'501',path:'/webSocket',name:'webSocket'}]},
      ]
    }
  },
  methods:{
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },

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
  /*background-color: #ffffff;*/
  font-size: 13px;
}

.el-aside{
  background-color:#ffffff;
}

.toggle-button{
  /*background-color: palevioletred;*/
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}


.el-menu-item{
  min-width: 180px;
}
</style>
