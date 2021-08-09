import Vue from "vue"
import router from "vue-router"
import home from "../components/home";
Vue.use(router)


export default new router({
    routes:[
        {path:'/home',component:home},
        //重定向home页
        {path:'/',redirect:'/home'}
    ]
})
