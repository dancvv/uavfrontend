import Vue from "vue"
import VueRouter from "vue-router";
import welcomepage from "@/components/welcomepage";
import whole from "@/components/common/Whole";
import leaflet from "@/page/multiuav/homemap/leaflet";
import Home from "@/page/Home"


import home from "../components/home";
import webSocket from "@/page/multiuav/test/webSocket";
import locationTable from "@/page/multiuav/location/locationTable";
import geofence from "@/page/multiuav/location/geofence";
import currentRoute from "@/page/multiuav/mission/currentRoute";
import videoWatch from "@/page/multiuav/mission/videoWatch";
import controlinstance from "@/page/multiuav/uavcontrol/controlinstance";


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
        {path:'/',redirect:'/welcome'},
        {path:'/leaf',component:leaflet},
        {path:'/login',component:()=>import('@/components/users/Login')},
        {path:'/',component:whole,
            children:[
                {path: '/welcome',component: welcomepage},
                {
                    path:'/home',component: Home
                },
                {
                    path:'/multiuav',
                    component:()=>import('@/page/multiuav/uavindex'),
                    redirect:'/multiuav/leafmap',
                    children:[
                        {
                            path:'leafmap',
                            component:()=>import('@/page/multiuav/homemap/leaflet'),
                            meta:{
                                title:'地图界面'
                            }
                        },
                        {
                            path:'uavdetail',
                            component:()=>import('@/page/multiuav/uavcontrol/controlinstance')
                        },
                        {
                            path:'location',
                            component:()=>import('@/page/multiuav/location/locationTable'),
                            meta:{
                                title: '位置编辑'
                            }
                        },
                        {
                            path:'geofence',
                            component:()=>import('@/page/multiuav/location/geofence')
                        },
                        {
                            path:'current',
                            component:()=>import('@/page/multiuav/mission/currentRoute')
                        },
                        {
                            path:'video',
                            component:()=>import('@/page/multiuav/mission/videoWatch')
                        },
                        {
                            path:'edit',
                            component:()=>import('@/page/multiuav/mission/editroute')
                        },
                        {
                            path:'socket',
                            component:()=>import('@/page/multiuav/test/webSocket')
                        }
                    ]
                },
                {
                    path: 'communityserve',
                    component: ()=>import('@/page/uavcommunity/community')
                },
                {
                    path: 'user',
                    component: ()=>import('@/components/users/profile')
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
