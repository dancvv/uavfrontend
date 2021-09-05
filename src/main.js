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

//导入mapbox地图
//使用单地图组件，不采用全组件加载的形式
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken='pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
Vue.use(mapboxgl)




//高德地图
import VueAMap from 'vue-amap';
//高德地图配置
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'ddd292c88aa1bad9c04891a47724f40a',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
//百度地图配置
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: '3LDoMsLxgOE30E57ebARtiIGylD2iYyi'
})
//axios安装
// import VueAxios from 'vue-axios'
import axios from "axios";
/* //错误写法
Vue.use(axios)
*/
//axios挂载
Vue.prototype.$http=axios;
//访问地址
axios.defaults.baseURL='http://localhost:8085/'
// axios.defaults.baseUrl='http://localhost:8085/'

//导入qs文件
import qs from 'qs'
Vue.prototype.$qs=qs


Vue.prototype.$message=Message
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  //注册router文件
  router,
  render: h => h(App),
}).$mount('#app')
