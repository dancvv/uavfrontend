import Vue from "vue"
import router from "vue-router"
import home from "../components/home";

import lessmap from "@/components/homemap/lessmap";
import BAIDUmap from "@/components/homemap/BAIDUmap";
Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            {path:'/mapview',component:BAIDUmap},
            {path:'/mapview2',component:lessmap}
        ]},
        //重定向home页
        {path:'/',redirect:'/home'}
    ]
})
