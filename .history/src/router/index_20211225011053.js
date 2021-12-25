import Vue from "vue"
import home from "../components/home";
import webSocket from "@/components/test/webSocket";
import VueRouter from "vue-router";
import leaflet from "@/components/page/multiuav/homemap/leaflet";
import locationTable from "@/components/location/locationTable";
import geofence from "@/components/location/geofence";
import currentRoute from "@/components/mission/currentRoute";
import videoWatch from "@/components/mission/videoWatch";
import controlinstance from "@/components/uav/controlinstance";
import welcomepage from "@/components/welcomepage";
import editroute from "@/components/mission/editroute";
import whole from "@/components/common/Whole";
// import index from "@/components/page/test1/index"

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
        {path:'/home',component:whole,
            children:[
                {path: '/welcome',component: welcomepage}
            ]},
        {path:'/home2',component:home,redirect:'/welcomepage',
        children:[
            {path:'/leaflet',component:leaflet},
            {path:'/welcomepage',component:welcomepage},
            {path:'/location',component: locationTable},
            {path: '/geofence',component: geofence},
            {path: '/current',component: currentRoute},
            {path: '/video',component: videoWatch},
            {path: '/uavdetail',component: controlinstance},
            {path: '/edit',component: editroute},

        ]},
        {path:'/setting',component:home,
            children:[
                {path:'/webSocket',component:webSocket}
            ]},

    ]
})
