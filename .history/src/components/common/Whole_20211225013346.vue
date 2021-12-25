<template>
  <div class="wrapper">
  <div class="header">
    <div class="logo">
      <div>
        <img src="../../assets/icon/uavIcon.svg" width="45px" alt="None">
      </div>
      <div class="text">
        <p style="margin-left: 10px;margin-top: 7px;cursor: pointer" @click="goHome">实时信息处理与态势感知平台</p>
      </div>
    </div>
    <!-- 水平一级菜单 -->
    <div style="float:left;">
      <el-menu :default-active="toIndex()" mode="horizontal" @select="handleSelect">
        <template v-for="item in items">
          <el-menu-item :index="item.index" :key="item.index">
            <template slot="title">
              <span slot="title">{{ item.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像，根据需要自行修改图片路径 -->
        <div class="user-avator"><img src="../../assets/img/img.jpg" /></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>修改密码</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

  <!-- 页面左侧二级菜单栏，和主体内容区域部分 -->
  <el-main>
    <router-view></router-view>
  </el-main>
</div>
</template>

<script>
export default {
  name: "whole",
  data(){
    return{
      items:[
        {index:'Home',title:'首页'},
        {index:'multiroute',title:'多无人机路径规划'},
        {index:'communityserve',title:'无人机社区服务'},
      ]
    }
  },
  computed:{
    username(){
      let username = localStorage.getItem('ms_username')
      return username?username:this.name;
    }
  },
  methods:{
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex(){
      return this.$route.path.split('/')[1]
    },
    // 切换菜单栏
    handleSelect(index) {
      this.$router.push('/' + index);
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$router.push('/login');
      }
    },
    goHome(){
      this.$router.push('/welcomepage')
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-style: revert;
  background: #fff;

}
.header .logo {
  float: left;
  margin-left: 50px;
  margin-top: 17.5px;
  height: 29px;
  width: 300px;
  vertical-align: middle;
  display: flex;
  align-items: center;
}

/* --------------- 用户头像区域的样式 ---------------- */
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
/* --------------- 水平一级菜单栏的样式--------------------- */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
  float: left;
  margin-left: 20px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #3989fa;
  font-weight: 700;
  padding: 1px;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
  color: black;
}
</style>
