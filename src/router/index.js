import Vue from "vue"
import VueRouter from "vue-router";
import welcomepage from "@/components/welcomepage";
import whole from "@/components/common/Whole";
import Home from "@/page/Home";


import leaflet from "@/components/homemap/leaflet";
import home from "../components/home";
import webSocket from "@/components/test/webSocket";
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
        //重定向home页
        {path:'/',redirect:'/welcome'},
        {path:'/',component:whole,
            children:[
                {path: '/welcome',component: welcomepage},
                {
                    path:'/home',component:Home
                },
                {
                    path:'/multiuav',
                    component:()=>import('@/page/multiuav/uavindex'),
                    redirect:'/multiuav/leaflet',
                    children:[
                        {
                            path:'leaflet',
                            component:()=>import('@/components/homemap/leaflet'),
                            meta:{
                                title:'二级菜单'
                            }
                        },
                        {
                            path:"test1-2",
                            component:()=>import('@/page/multiuav/uav'),
                            meta:{
                                title: '二级子菜单'
                            }
                        },
                        {
                            path:'test1-3',
                            component:()=>import('@/components/location/locationTable')
                        }
                    ]
                }
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
            // {path: '/edit',component: editroute},

        ]},
        {path:'/setting',component:home,
            children:[
                {path:'/webSocket',component:webSocket}
            ]},

    ]
})
