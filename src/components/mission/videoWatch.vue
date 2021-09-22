<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务执行</el-breadcrumb-item>
      <el-breadcrumb-item>实时画面</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card-box">
      <div>
        <div id="dplayer" class="play-root" ></div>
        <div @click="onPlay">点我播放</div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "videoWatch",
  data(){
    return{
      dp:null,
    }
  },
  methods:{
    onPlay(){
      this.dp.play()
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.card-box{
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>