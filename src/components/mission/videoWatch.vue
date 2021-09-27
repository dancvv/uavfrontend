<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务执行</el-breadcrumb-item>
      <el-breadcrumb-item>实时画面</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card-box">

      <video id="videoElement" controls autoplay width="600" height="450"></video>
      <div>
        <div id="dplayer" class="play-root" ></div>
        <div @click="onPlay">点我播放</div>
      </div>
    </el-card>
  </div>
</template>

<script>

import DPlayer from 'dplayer'
import flvjs from 'flv.js'
export default {
  name: "videoWatch",

  data(){
    return{
      dp:null,
      test:null,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          withCredentials: false,
          type: "application/x-mpegURL", //播放类型，如果为rtmp配置为rtmp/mp4
          src: "http://192.168.1.109:8080/live/phone.m3u8" //直播流地址
        }],
        poster: "poster.jpg", //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
    }
  },
  methods:{
    onPlay(){
      this.dp.play()
    },

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
        url: 'http://192.168.1.109:8080/live/phone.flv',
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

    if (flvjs.isSupported()) {
      let videoElement = document.getElementById('videoElement');
      let flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: 'http://192.168.1.109:8080/live/phone.flv'
      });
      console.log(flvPlayer,'flv对象')
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
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
#dplayer{
  width: 500px;
}
.video-player vjs-custom-skin{
  width: 500px;
}
</style>
