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
import DPlayer from 'dplayer'
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
  },
  mounted(){
     this.dp = new DPlayer({
      container: document.getElementById('dplayer'),
      autoplay: false,
      theme: '#FADFA3',
      loop: true,
      lang: 'zh-cn',
      screenshot: true,
      hotkey: true,
      preload: 'auto',
      // logo: '../../assets/logo.png',
      volume: 0.6,
      mutex: true,
      video: {
        url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
        pic: 'dplayer.png',
        thumbnails: 'thumbnails.jpg',
        type: 'hls',
      },
    });
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
#dplayer{
  width: 30%;
}
</style>
