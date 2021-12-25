<template>
  <div class="main">
    <div class="homestyle">
      <h1 style="font-size: 26px">欢迎进入实时信息处理与态势感知平台</h1>
      <p style="font-size: 20px">平台可以实现路线规划，数据管理，任务下发等功能</p>
      <img src="../assets/picture/sky-background.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "welcomepage"
}
</script>

<style scoped>

.homestyle{

  position: absolute;
  top: 36%;
  left: 42%;
  margin-top: -20px;
  margin-left: -20px;
  text-align: center;
  /*margin-top: 20%;*/
  /*background-position: 50% 50%;*/
  /*background-repeat: no-repeat;*/
}
.main{
  width:100%;
  height:100%;
  /*min-width: 1000px;*/
  z-index:-10;
  zoom: 1;
  /*background-color: #fff;*/
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background: url("../assets/picture/sky-background.png") no-repeat ;
  background-size: 100%;
}
</style>
