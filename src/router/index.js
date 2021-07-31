import { createRouter, createWebHistory } from 'vue-router'
import home from "@/components/home";
import index from "../components/index";
import mainbody from "@/components/content/mainbody";

const routes=[
    {path:'/home',component:home},
    {path: '/',redirect:'/index'},
    {path:'/index',component:index,
        //子路由
        children:[
            {path:"/mainbody",component:mainbody},
        ],
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router;