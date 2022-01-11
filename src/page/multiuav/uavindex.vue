<template>
  <el-container>
    <!--  一级菜单下的二级菜单-->
    <el-aside :width=" isAsideCollapse ? '62px' : '200px'">
      <el-menu class="el-menu-vertical-demo"
               text-color="#666"
               active-text-color="#409eff"
               :router="true"
               :collapse="isAsideCollapse"
               unique-opened
               default-active="leafmap"
               :collapse-transition="false">
        <el-menu-item index="leafmap">
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

    <!--  以及二级菜单所对应的页面-->
    <el-main class="el-main-box">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "uavindex",
  data(){
    return{
      isCollapse:false,
      items: [
        {
          index: 'leafmp',
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
        {id:'200',path:'manage',name:'飞行参数设置',order:1,icon:'el-icon-s-cooperation',
          children:[
            {id:'201',path:'location',name:'任务位置信息',order:2},
            {id:'202',path:'geofence',name:'地理围栏',order:2},
          ]},
        {id:'300',path:'mission',name:'任务执行',order:1,icon:'el-icon-s-goods',
          children: [
            {id:'301',path:'current',name:'当前路线',order:2},
            {id:'302',path:'video',name:'实时画面',order:2},
            {id:'303',path:'edit',name:'路线更改',order:2},
          ]},
        {id:'400',path:'status',name:'数据分析',order:1,icon:'el-icon-s-order',
          children: [
            {id:401,path:'device',name:'设备管理',order:2},
            {id:402,path:'socket',name:'WebSocket',order:2}
          ]},
        {id:'500',path:'setting',name:'设置',order:1,icon:'el-icon-s-data',
          children: [
            {id:'501',path:'/lad',name:'无人机参数设置'},
            {id:'502',path:'/laa',name:'用户设置'},
            {id:'503',path:'/版本信息',name:'版本信息'},
          ]},
      ],
    }
  },
  mounted() {},
  computed:{
    ...mapState(['syncstatus']),
    isAsideCollapse(){
      // return this.isCollapse = this.syncstatus.isAsideCollapse()
      return this.syncstatus.isAsideCollapse
    }
  },
  methods:{},
}
</script>

<style scoped>
.el-main-box{
  margin: 0px;
  padding: 0px;
}
.el-aside{
  height: 100%;
  background: #ffffff;
}
.el-menu--collapse {
  width: 60px;
}
.el-container{
  height: 100%;
}
.el-menu{
  border-right: solid 1px #FFF;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #FFF;
}
</style>
