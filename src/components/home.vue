<template>
<el-container class="home-container">
<!--  头部区域-->
  <el-header>
    <div>
      <img src="../assets/iconsys.png" alt="empty" width="50px">
    </div>
    <span id="header-title" @click="backTo">
      <h2>无人机管理系统</h2>
    </span>

  </el-header>
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">
<!--          展开图标-->
          <i class="el-icon-s-unfold" v-if="isCollapse"></i>
<!--          折叠图标-->
          <i class="el-icon-s-fold" v-if="!isCollapse"></i>
        </div>
        <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="#304156" :router="true"
                 unique-opened :collapse="isCollapse" default-active="1" :collapse-transition="false">
          <el-menu-item index="mapview">
            <i class="el-icon-user"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="leafmap">
            <i class="el-icon-user"></i>
            <span slot="title">leafMAP</span>
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

        <!--        <el-menu class="menu-opt" text-color="#fff" active-text-color="#ffd04b" background-color="#304156"-->
<!--        unique-opened :collapse="isCollapse" default-active="1" :collapse-transition="false">-->
<!--          <el-menu-item index="1">-->
<!--              <i class="el-icon-s-home"></i>-->
<!--              <span slot="title">首页</span>-->
<!--          </el-menu-item>-->
<!--          <el-submenu index="2">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-s-promotion"></i>-->
<!--              <span slot="title">飞行器管理</span>-->
<!--            </template>-->
<!--            <el-menu-item index="2-1">飞行监控</el-menu-item>-->
<!--            <el-menu-item index="2-2">地理围栏</el-menu-item>-->
<!--            <el-menu-item index="2-3">地图底图</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="3">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-menu"></i>-->
<!--              <span slot="title">任务管理</span>-->
<!--            </template>-->
<!--            <el-menu-item index="2-1">当前路线</el-menu-item>-->
<!--            <el-menu-item index="2-2">路线添加</el-menu-item>-->
<!--            <el-menu-item index="2-3">路线更改</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="4">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-suitcase"></i>-->
<!--              <span slot="title">飞行器状态</span>-->
<!--            </template>-->
<!--            <el-menu-item index="4-1">设备管理</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="5">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-setting"></i>-->
<!--              <span slot="title">设置</span>-->
<!--            </template>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->



      </el-aside>
<!--      主内容区域-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      //判断是否合并
      isCollapse:true,
    //  默认激活路径
      activePath:'',
    //  icon图标数据
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
          {id:'200',path:'/manage',name:'飞行器管理',order:1,icon:'el-icon-s-cooperation',
          children:[
              {id:'201',path:'/monitor',name:'飞行监控',order:2},
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
          {id:'500',path:'/setting',name:'设置',order:1,icon:'el-icon-s-data'},
      ]
    }
  },
  created() {
  },
  methods:{
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    backTo(){
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.el-header{
  background-color: #304156;
  display: flex;
  color: white;
  align-items: center;
  font-size: 20px;
  justify-content: flex-start;
}
#header-title{
  padding: 10px;
  display: inline;
  text-align: center;
}
.el-aside{
  background-color: #304156;
  color: white;
}
.el-main{
  background-color: #F0F2F5;
  padding: 0px;
}
.home-container{
  height: 100%;
}

.toggle-button{
  /*background-color: palevioletred;*/
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
