<template>
<el-container class="home-container">
  <!--      头部和侧边栏组件-->
  <el-header>
    <div class="header-icon">
      <img src="../assets/icon/uavIcon.svg" width="45px" style="margin-bottom:10px" alt="None">
    </div>
    <p class="header-title" @click="backTo">
      实时信息处理与态势感知平台
    </p>
    <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-s-unfold" v-show="isAsideCollapse"></i>
          <i class="el-icon-s-fold" v-show="!isAsideCollapse"></i>
    </div>
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
    backTo(){
      this.$router.push('/welcomepage')
    }

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
    align-items: center;
    font-size: 16px;
    justify-content: flex-start
}


.header-title{
  cursor: pointer;
  margin-left: 5px;

}
.el-main{
  background-color: #F0F2F5;
  padding: 0px;
}
.home-container{
  height: 100%;
}

</style>
