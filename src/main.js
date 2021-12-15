import Vue from 'vue'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

//导入全局样式表
import './assets/style/global.css'
import App from "@/App";
//引入websocket全局配置
import global from "../public/globalWebSocket";
Vue.prototype.global=global

// import VueAxios from 'vue-axios'
import axios from "axios";
/* //错误写法
Vue.use(axios)
*/
//axios挂载
Vue.prototype.$http=axios;
//访问地址
// axios.defaults.baseURL='http://49.233.56.74:8085/'
axios.defaults.baseURL='http://localhost:8085'

//导入qs文件
import qs from 'qs'
Vue.prototype.$qs=qs

//导入vuex
import store from './store/store'

//leaflet地图
// import L from "leaflet"
// import "leaflet/dist/leaflet.css";
// leaflet组件
import maputils from "./maputils"
Vue.prototype.$maputils = maputils
// 设置图片默认访问路径

// Vue.use(L)

// dplayer视频播放
// import DPlayer from 'dplayer';
// Vue.use(DPlayer)
import VideoPlayer from 'vue-video-player'
require('vue-video-player/src/custom-theme.css')
import 'videojs-contrib-hls' //单是 RTMP 的话不需要第三方库，如果是 HLS 的话需要引入videojs-contrib-hls，看具体情况而定。
Vue.use(VideoPlayer);
import flvjs from 'flv.js'
Vue.use(flvjs)

Vue.prototype.$message=Message
Vue.use(ElementUI);

Vue.config.productionTip = false

import UUID from "uuid-js"
Vue.use(UUID)

// echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 引入数据大屏项目
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

new Vue({
  //注册router文件
  router,
  //vuex
  store,
  render: h => h(App),
}).$mount('#app')
