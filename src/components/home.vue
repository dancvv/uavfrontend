<template>
<el-container class="home-container">

  <!--      侧边栏-->
  <Aside/>

    <el-container>
      <!--  头部区域-->
      <el-header>
        <div>
          <img src="../assets/iconsys.png" alt="empty" width="20px">
        </div>
        <span id="header-title" @click="backTo">
          <h3>无人机管理系统</h3>
        </span>
      </el-header>

<!--      主内容区域-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
</template>

<script>


import Aside from "@/components/Aside";
export default {
  name: "home",
  components: {Aside },
  data(){
    return{
    //  默认激活路径
      activePath:'',
    }
  },
  created() {
  },
  methods:{

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
  font-size: 16px;
  justify-content: flex-start;
}
#header-title{
  padding: 10px;
  display: inline;
  text-align: center;
}
.el-main{
  background-color: #F0F2F5;
  padding: 0px;
}
.home-container{
  height: 100%;
}

</style>
