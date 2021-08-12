import Vue from "vue"
import router from "vue-router"
import home from "../components/home";

import BAIDUmap from "@/components/homemap/BAIDUmap";
import homepage from "@/components/homepage"
import mapview from "@/components/homemap/mapview";
Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            {path:'/home',redirect:'/homepage'},
            {path:'/mapview',component:BAIDUmap},
            {path:'/mapview2',component:mapview}
        ]},
        //重定向home页
        {path:'/home',redirect:'/homepage'},
        {path:'/homepage',component:homepage}
    ]
})
