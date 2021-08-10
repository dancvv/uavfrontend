import Vue from "vue"
import router from "vue-router"
import home from "../components/home";
import mapview from "../components/homemap/mapview";
Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home,
        children:[
            {path:'/mapview',component:mapview}
        ]},
        //重定向home页
        {path:'/',redirect:'/home'}
    ]
})
