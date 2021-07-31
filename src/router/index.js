import { createRouter, createWebHistory } from 'vue-router'
import home from "../components/home";
import index from "../components/index";
import book from "../components/content/book";
import books from "../components/books";
import mainbody from "../components/content/mainbody";
const routes=[
    {path:'/home',component:home,
    children: [
        {path:'/books',component: books,
            children: [
                {path: '/sbook/:id',component: book}
            ]}
    ]},
    // {path: '/',redirect:'/home'},
    {path:'/index',component:index,
        //子路由
        children:[
            {path:"/mainbody",component:mainbody},
        ],
    },

];
const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router;
