import Vue from "vue"
import home from "../components/home";
import webSocket from "@/components/test/webSocket";
import VueRouter from "vue-router";
import BodyContent from "@/components/BodyContent";
import leaflet from "@/components/homemap/leaflet";
import locationTable from "@/components/location/locationTable";
import geofence from "@/components/location/geofence";
import currentRoute from "@/components/mission/currentRoute";
import videoWatch from "@/components/mission/videoWatch";
import controlinstance from "@/components/uav/controlinstance";


//处理push操作的重复点击问题
const originalPush=VueRouter.prototype.push
VueRouter.prototype.push=function push(location) {
    return originalPush.call(this,location).catch(err=>err)
}


Vue.use(VueRouter)


export default new VueRouter({
    mode:'history',
    routes:[
        //重定向home页
        {path:'/',redirect:'/home'},
        {path:'/home',component:home,redirect:'/welcomepage',
        children:[
            {path:'/leaflet',component:leaflet},
            {path:'/welcomepage',component:BodyContent},
            {path:'/location',component: locationTable},
            {path: '/geofence',component: geofence},
            {path: '/current',component: currentRoute},
            {path: '/video',component: videoWatch},
            {path: '/uavdetail',component: controlinstance}

        ]},
        {path:'/setting',component:home,
            children:[
                {path:'/webSocket',component:webSocket}
            ]},

    ]
})
