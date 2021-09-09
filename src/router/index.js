import Vue from "vue"
import home from "../components/home";
import webSocket from "@/components/test/webSocket";
import homepage from "@/components/homepage";

import BAIDUmap from "@/components/homemap/BAIDUmap";
import mapboxView from "@/components/homemap/mapboxView";
import VueRouter from "vue-router";
import BodyContent from "@/components/BodyContent";

//处理push操作的重复点击问题
const originalPush=VueRouter.prototype.push
VueRouter.prototype.push=function push(location) {
    return originalPush.call(this,location).catch(err=>err)
}


Vue.use(VueRouter)


export default new VueRouter({
    routes:[
        {path:'/home',component:home,
        children:[
            {path:'/mapview',component:mapboxView},
            {path:'/mapboxgl',component:BAIDUmap},
            {path:'/welcomepage',component:BodyContent}
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
