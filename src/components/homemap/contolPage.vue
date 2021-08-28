<template>
<div>
  <el-row type="flex" class="row-bg">
    <el-col>
      <el-radio-group v-model="mapType">
        <el-radio-button label="BMAP_NORMAL_MAP" size="medium">2D地图</el-radio-button>
        <el-radio-button label="BMAP_SATELLITE_MAP" size="medium">卫星地图</el-radio-button>
      </el-radio-group>
    </el-col>
  </el-row>
  <el-row>

    <el-col>
      <el-button type="success" @click="handler">清除路线</el-button>
      <el-button type="primary" @click="toggle('polyline')">{{polyline.editing?'停止绘制':'开始绘制'}}</el-button>
      <el-button type="success" @click="uavmission">无人机任务匹配</el-button>
      <el-button type="success" @click="startMove">起飞</el-button>
    </el-col>
    <el-card v-show="cardVisible">
      <h3>参数设置</h3>
      无人机编号：<el-input v-model="uavConfig.serialNum"></el-input><br>
      经度：<el-input v-model="uavConfig.lng">{{uavConfig.lng}}</el-input><br>
      纬度：<el-input v-model="uavConfig.lat">{{uavConfig.lat}}</el-input><br>
      <el-button @click="cardVisible = false">取 消</el-button>
      <el-button type="primary" @click="editConfirm">确 定</el-button>
    </el-card>
  </el-row>
  <el-row>
    <el-button type="primary" @click="show">add route</el-button>
    <el-input v-model="i">{{i}}</el-input>
  </el-row>
</div>
</template>

<script>
export default {
  name: "contolPage"
}
</script>

<style scoped>

</style>
