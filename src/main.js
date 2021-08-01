import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import AmapVue from '@amap/amap-vue'
import App from "@/App";

//地图配置
AmapVue.config.version='2.0';
AmapVue.config.key = "ddd292c88aa1bad9c04891a47724f40a";
Vue.use(AmapVue);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
