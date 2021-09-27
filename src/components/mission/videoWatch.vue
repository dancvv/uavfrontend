<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务执行</el-breadcrumb-item>
      <el-breadcrumb-item>实时画面</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card-box">
      <h3>实时画面</h3>
      <el-divider></el-divider>
      <el-table :data="videoData" :highlight-current-row="true">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="uavId" label="无人机编号" min-width="100px"></el-table-column>
        <el-table-column prop="image" label="视频流" min-width="200px"></el-table-column>
        <el-table-column prop="manage" label="管理" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="previewUav">{{ videoPreview?'停止':'预览' }}</el-button>
            <el-button type="error" size="mini" @click="deleteUav(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      flv 直播插件后期考虑是否加上-->
<!--      <video id="videoElement" controls autoplay width="600" height="450"></video>-->
      <div id="playerbox" v-show="videoPreview">
        <div id="dplayer" class="play-root" ></div>
      </div>
    </el-card>
  </div>
</template>

<script>

import flvjs from "flv.js";
import DPlayer from 'dplayer'

export default {
  name: "videoWatch",

  data(){
    return{
      dp:null,
      videoData:[{uavId:'大黑山1号',image:'http://192.168.1.109:8080/live/phone.m3u8'},
        {uavId:'大黑山2号',image:'http://192.168.1.109:8080/live/TWO.m3u8'},
        {uavId:'大黑山3号',image:'http://192.168.1.109:8080/live/three.m3u8'}],
      videoPreview:false,
    }
  },
  methods:{
    onPlay(){
      this.dp.play()
    },
    // 预览无人机实时视频
    previewUav(){
      this.videoPreview=!this.videoPreview
    },
    deleteUav(rowIndex){
      this.videoData.delete(rowIndex)
    }


  },
  mounted(){
    //  this.dp = new DPlayer({
    //   container: document.getElementById('dplayer'),
    //   autoplay: false,
    //   theme: '#FADFA3',
    //    live: 'true',
    //   loop: true,
    //   lang: 'zh-cn',
    //   screenshot: true,
    //   hotkey: true,
    //   preload: 'auto',
    //   // logo: '../../assets/logo.png',
    //   volume: 0.6,
    //   mutex: true,
    //   video: {
    //     url: 'http://192.168.1.109:8080/live/phone.flv',
    //     pic: 'dplayer.png',
    //     thumbnails: 'thumbnails.jpg',
    //     type: 'hls',
    //   },
    // });

    this.dp = new DPlayer({
      container: document.getElementById('dplayer'),
      video: {
        url: 'http://192.168.1.109:8080/live/stream.flv',
        type: 'customFlv',
        customType: {
          customFlv: function (video) {
            const flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: video.src,
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
          },
        },
      },
    });
    // flv 直播形式
    // if (flvjs.isSupported()) {
    //   let videoElement = document.getElementById('videoElement');
    //   let flvPlayer = flvjs.createPlayer({
    //     type: 'flv',
    //     isLive: true,
    //     hasAudio: false,
    //     url: 'http://192.168.1.109:8080/live/phone.flv'
    //   });
    //   console.log(flvPlayer,'flv对象')
    //   flvPlayer.attachMediaElement(videoElement);
    //   flvPlayer.load();
    //   flvPlayer.play();
    // }
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
  width: 80%;

}
#playerbox{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.video-player vjs-custom-skin{
  width: 500px;
}
.el-table{
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 10%;
  width: 82%;
}
</style>
