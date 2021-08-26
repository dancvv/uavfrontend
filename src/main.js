import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
//导入全局样式表
import './assets/style/global.css'
import App from "@/App";

//使用leaflet




import VueAMap from 'vue-amap';


Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'ddd292c88aa1bad9c04891a47724f40a',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Marker'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: '3LDoMsLxgOE30E57ebARtiIGylD2iYyi'
})



//地图配置

Vue.use(ElementUI);
//注册router

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
