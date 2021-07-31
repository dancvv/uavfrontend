import { createRouter, createWebHistory } from 'vue-router'
import home from "@/components/home";
import index from "../components/index";

const routes=[
    {path:'/home',component:home},
    {path:'/index',component:index}
];
const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router;