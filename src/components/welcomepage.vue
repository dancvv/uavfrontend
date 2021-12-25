<template>
  <div class="main">
      <div class="homestyle">
        <h1 style="font-size: 26px">欢迎进入实时信息处理与态势感知平台</h1>
        <p style="font-size: 20px">平台可以实现路线规划，数据管理，任务下发等功能</p>
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
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.main{
  /*width:100%;*/
  height:100%;
  padding: 0px;
  margin: 0px;
  background: url("../assets/picture/sky-background.png") no-repeat ;
  background-size: 100%;
}
</style>
