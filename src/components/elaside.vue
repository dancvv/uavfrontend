<template>
<div>
  <el-aside width="200px">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template #title ><i class="el-icon-location"></i>无人机状态</template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1" @click="doOne">选项1</el-menu-item>
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
</div>
</template>

<script>
export default {
  name: "elaside",
  methods:{
    doOne(){
      alert("点击触发")
    }
  }
}
</script>

<style scoped>

</style>
