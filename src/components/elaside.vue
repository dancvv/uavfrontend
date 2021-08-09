<template>
  <el-container>
  <el-aside width="200px">
    <el-menu :default-openeds="[]">
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template #title><i class="el-icon-s-promotion"></i>飞行器管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">飞行监控</el-menu-item>
          <el-menu-item index="1-2">地理围栏</el-menu-item>
          <el-menu-item index="1-3">地图底图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template #title><i class="el-icon-menu"></i>任务管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">当前路线</el-menu-item>
          <el-menu-item index="2-2">路线添加</el-menu-item>
          <el-menu-item index="2-3">路线更改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template #title><i class="el-icon-monitor"></i>地面站</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">轨迹数据</el-menu-item>
          <el-menu-item index="3-2">图传数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template #title><i class="el-icon-suitcase"></i>飞行器状态</template>
        <el-menu-item-group>
          <el-menu-item index="4-1">设备管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template #title><i class="el-icon-setting"></i>设置</template>
      </el-submenu>
    </el-menu>
  </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "elaside",
  methods:{
    doOne(){
      alert("点击")
    }
  }
}
</script>

<style scoped>
.aside{
  text-align: center;
}
</style>
