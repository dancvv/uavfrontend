<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
      <el-breadcrumb-item>地理围栏</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="boxCard">
      <h3>地理围栏</h3>
      <el-form>

      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "geofence"
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.boxCard{
  margin-top: 30px;
  margin-left: 80px;
  margin-right: 80px;
}
</style>
