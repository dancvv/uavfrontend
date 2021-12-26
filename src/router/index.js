import Vue from "vue"
import VueRouter from "vue-router";
import welcomepage from "@/components/welcomepage";
import whole from "@/components/common/Whole";
import leaflet from "@/components/homemap/leaflet";


// import home from "../components/home";
// import webSocket from "@/components/test/webSocket";
// import locationTable from "@/components/location/locationTable";
// import geofence from "@/components/location/geofence";
// import currentRoute from "@/components/mission/currentRoute";
// import videoWatch from "@/components/mission/videoWatch";
// import controlinstance from "@/components/uav/controlinstance";


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
        {path:'/',component:whole,
            children:[
                {path: '/welcome',component: welcomepage},
                {
                    path:'/home',component: leaflet
                },
                {
                    path:'/multiuav',
                    component:()=>import('@/page/multiuav/uavindex'),
                    redirect:'/multiuav/leafmap',
                    children:[
                        {
                            path:'leafmap',
                            component:()=>import('@/components/homemap/leaflet'),
                            meta:{
                                title:'地图界面'
                            }
                        },
                        {
                            path:'location',
                            component:()=>import('@/components/location/locationTable'),
                            meta:{
                                title: '位置编辑'
                            }
                        },
                        {
                            path:'geofence',
                            component:()=>import('@/components/location/geofence')
                        },
                    ]
                }
            ]},


        // {path:'/home2',component:home,redirect:'/welcomepage',
        // children:[
        //     {path:'/leaflet',component:leaflet},
        //     {path:'/welcomepage',component:welcomepage},
        //     {path:'/location',component: locationTable},
        //     {path: '/geofence',component: geofence},
        //     {path: '/current',component: currentRoute},
        //     {path: '/video',component: videoWatch},
        //     {path: '/uavdetail',component: controlinstance},
        //     // {path: '/edit',component: editroute},
        //
        // ]},
        // {path:'/setting',component:home,
        //     children:[
        //         {path:'/webSocket',component:webSocket}
        //     ]},

    ]
})
