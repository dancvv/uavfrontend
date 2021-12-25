import Vue from "vue"
import VueRouter from "vue-router";
import whole from "@/components/common/Whole";
import welcomepage from "@/components/welcomepage";
import Home from "@/components/page/Home";

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
        {path:'/',component:whole,
            children:[
                {path: '/welcome',component: welcomepage},
                {
                    path:'/home',component:Home
                },
                {
                    path:'/multiuav',
                    component:()=>import('@/components/page/multiuav/uavindex'),
                    redirect:'/multiuav/leaflet',
                    children:[
                        {
                            path:'/leaflet',
                            component:()=>import('@/components/page/multiuav/homemap/leaflet'),
                        }
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
        //     {path: '/edit',component: editroute},

        // ]},
        // {path:'/setting',component:home,
        //     children:[
        //         {path:'/webSocket',component:webSocket}
        //     ]},

    ]
})
