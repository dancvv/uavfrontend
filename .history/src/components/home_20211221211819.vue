<template>
<el-container class="home-container">
  <!--      头部和侧边栏组件-->
  <el-header>
    <div class="header-icon">
      <img src="../assets/icon/uavIcon.svg" width="45px" alt="None">
    </div>
    <p class="header-text">
      实时信息处理与态势感知平台
    </p>
  </el-header>
  <el-container>
    <Aside/>
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
  components: {  Aside },
  data(){
    return{
    //  默认激活路径
      activePath:'',
    }
  },
  created() {

  },
  methods:{


  }
}
</script>

<style scoped>

.header-icon{
  display: block;
  text-align: center;
  margin-top: 30px;
}
.el-header{
  background-color: #F0F2F5;
  display: flex;
  color: white;
  align-items: center;
  font-size: 16px;
  justify-content: flex-start;
}
.header-title{
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
