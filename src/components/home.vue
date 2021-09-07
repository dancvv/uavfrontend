<template>
<el-container class="home-container">
  <!--      头部和侧边栏组件-->
  <Aside/>
    <el-container>
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
