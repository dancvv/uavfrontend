import Vue from "vue"
import router from "vue-router"
import home from "../components/home";
import webSocket from "@/components/test/webSocket";
import homepage from "@/components/homepage";

import BAIDUmap from "@/components/homemap/BAIDUmap";
import mapboxView from "@/components/homemap/mapboxView";

Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            // {path:'/home',redirect:'/homepage'},
            {path:'/mapview',component:mapboxView},
            {path:'/mapboxgl',component:BAIDUmap},
        ]},
        //重定向home页
        {path:'/',redirect:'/home'},
        {path:'/homepage',component:homepage},
        {path:'/setting',component:home,
            children:[
                {path:'/webSocket',component:webSocket}
            ]},

    ]
})
