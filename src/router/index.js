import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'


Vue.use(VueRouter)


let originPush=VueRouter.prototype.push;
 
VueRouter.prototype.push=function(location,resolve,reject){
   if(resolve && reject){
      //如果成功 调用原来的push方法  
           originPush.call(this,location,resolve,reject); 
               }else{
           originPush.call(this,location,()=>{},()=>{}); }  
               }  

const routes = [
  {
    path:'/',
    component:Layout,
    redirect:'/home',
    children:[{
      path:'home',
      component:() => import('@/views/Home')
    }]

  },
  {
    path:'/goods',
    component:Layout,
    children:[{
      name:"Goods",
      path:'detail',
      component:() => import('@/views/goods/Goods')
    },
    {
      name:"Show",
      path:'show',
      component:() => import('@/views/goods/Show')
    },
    {
      name:"Cart",
      path:"cart",
      component:() => import('@/views/goods/Cart')
    },
    {
      name:"Order",
      path:"order",
      component:() => import('@/views/goods/Order')
    },
    {
      name:"OrderDetail",
      path:'order/Detail',
      component:() => import('@/views/goods/OrderDetail')
    }
  ]
  },
  {
    name:"User",
    path:'/user',
    component:Layout,
    children:[{
      name:"Login",
      path:'login',
      meta:{
        showSideBar:false
      },
      component:()=> import('@/views/login')
    },
    {
      name:"Register",
      path:'register',
      meta:{
        showSideBar:false
      },
      component:()=> import('@/views/login/Register')
    },
  ]
  }

]

const router = new VueRouter({
  routes
})




export default router
