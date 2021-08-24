import Vue from "vue"
import router from "vue-router"
import home from "../components/home";

import BAIDUmap from "@/components/homemap/BAIDUmap";
import homepage from "@/components/homepage"
import leafmap from "@/components/homemap/leafmap";
import amapv from "@/components/homemap/amapv";
Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            // {path:'/home',redirect:'/homepage'},
            {path:'/mapview',component:BAIDUmap},
            {path:'/leafmap',component:leafmap},
        ]},
        //重定向home页
        {path:'/',redirect:'/home'},
        {path:'/homepage',component:homepage},
        {path:'/map',component:amapv},
    ]
})
