import Vue from "vue"
import router from "vue-router"
import home from "../components/home";
import BAIDUmap from "../components/homemap/BAIDUmap";
import amapv from "../components/homemap/amapv";
import homepage from "../components/homepage";

Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            // {path:'/home',redirect:'/homepage'},
            {path:'/mapview',component:BAIDUmap},
            {path:'/map',component:amapv},
        ]},
        //重定向home页
        {path:'/',redirect:'/home'},
        {path:'/homepage',component:homepage},
    ]
})
