import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect:"association",
      children:[
        {
        path:"association",
        name:"association",
        meta:{
          isShow:true,
          titile:"社团列表"
        },
        component: () => import('../views/AssociationView.vue')
      },
      {
        path:"manager",
        name:"manager",
        meta:{
          isShow:true,
          titile:"管理员列表"
        },
        component: () => import('../views/ManagerView.vue')
      },
      {
        path:"activity",
        name:"activity",
        meta:{
          isShow:true,
          titile:"活动列表"
        },
        component: () => import('../views/ActivityView.vue')
      },
      {
        path:"application",
        name:"application",
        meta:{
          isShow:true,
          titile:"申请列表"
        },
        component: () => import('../views/ApplicationView.vue')
      }
      
    ]
  },
    {
      path: '/login',
      name: 'login',
    
      component: () => import('../views/LoginView.vue')
    }
  ]
  
})
router.beforeEach((to,from,next)=>{
  const token: string | null = localStorage.getItem('token')
  if(!token && to.path !== '/login'){
    next('/login')
  }else{
    next()
  }
})

export default router
