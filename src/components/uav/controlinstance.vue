<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>任务执行</el-breadcrumb-item>
    <el-breadcrumb-item>当前路线</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <div slot="header">
      <h3>状态初始化</h3>
    </div>
    <div>
      <p>无人金</p>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "controlinstance"
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.el-card{
  margin-left: 30px;
  margin-right: 30px;
}
</style>
