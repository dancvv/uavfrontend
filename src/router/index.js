import Vue from "vue"
import router from "vue-router"
import home from "../components/home";

import BAIDUmap from "@/components/homemap/BAIDUmap";
import homepage from "@/components/homepage"
import demo from "../components/homemap/demo";
import GLmapview from "../components/homemap/GLmapview";
Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            // {path:'/home',redirect:'/homepage'},
            {path:'/mapview',component:GLmapview},
            {path:'/mapview2',component:BAIDUmap}
        ]},
        //重定向home页
        {path:'/',redirect:'/home'},
        {path:'/homepage',component:homepage},
        {path:'/demo',component:demo}
    ]
})
