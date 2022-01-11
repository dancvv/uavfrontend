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
               default-active="usermap"
               :collapse-transition="false">
        <el-menu-item index="usermap">
          <i class="el-icon-map-location"></i>
          <span slot="title">社区用户展示</span>
        </el-menu-item>
        <el-menu-item index="clustermap">
          <i class="el-icon-map-location"></i>
          <span slot="title">用户聚类</span>
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
  name: "community",
  data(){
    return{
      isCollapse:false,
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
        {id:'200',path:'manage',name:'算法',order:1,icon:'el-icon-s-cooperation',
          children:[
            {id:'201',path:'demomap',name:'算法',order:2},
          ]},
      ],
    }
  },
  computed:{
    ...mapState(['syncstatus']),
    isAsideCollapse(){
      // return this.isCollapse = this.syncstatus.isAsideCollapse()
      return this.syncstatus.isAsideCollapse
    }
  },
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
