import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import login from "../components/login.vue"
import index from "../components/index.vue"
import users from "../components/users.vue"
import roles from "../components/roles.vue"
import rights from "../components/rights.vue"
let routes = [
    {
        path:"/login",
        component:login
    },
    {
        path:'/',
        component:index,
        children:[{
            path:'users',
            component:users
        },{
            path:'roles',
            component:roles
        },{
            path:'rights',
            component:rights
        },
    ]
    }
]
let router = new VueRouter({
    routes
  })
  router.beforeEach((to,from,next)=>{
    if(to.path=='/login'){
        next()
    }else{
        if(window.sessionStorage.getItem('token')){
            next()
        }else{
            Vue.prototype.$message.warning('请先登录')
            next('/login')
        }
    }
  })
  export default router