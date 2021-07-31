<template>
<div>
  <el-header><h1>无人机管理系统</h1></el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template #title><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      主页内容<br>
      <router-link to="/index/mainbody">去找面粉</router-link>
      <router-view></router-view>
    </el-main>
  </el-container>

</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.el-header{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}


</style>