import Vue from 'vue'
import Router from 'vue-router'
import AddBlog from '@/components/AddBlog'
import ShowBlogs from '@/components/Showblogs'
import SingleBlog from '@/components/SingleBlog'
import Eidt from '@/components/Eidt'
import Card from '@/components/Card'
import Login from '@/components/Login'
import Mlogin from '@/components/Mlogin'
import Register from '@/components/Register'
import Swiper from '@/components/Swiper'
import last from '@/components/last'



Vue.use(Router)


const router = new Router({
//	mode:"history",
	base: __dirname,
  routes: [
    {
      path: '/',
      component: Card
    },
    {
      path: '/show',
      name: 'ShowBlogs',
      component: ShowBlogs
    },
    {
      path: '/mlogin',
      name: 'mlogin',
      component: Mlogin
    },
    {
      path: '/last',
      name: 'last',
      component: last
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: Swiper
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add',
      name: 'AddBlogs',
      component: AddBlog
    },
    {
      path: '/eidt/:id',
      name: 'Eidt',
      component: Eidt
    },
     {
      path: '/blog/:id',
      name: 'idblog',
      component: SingleBlog
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

//全局路由守卫
router.beforeEach((to,from,next)=>{
	  // to: Route: 即将要进入的目标 路由对象
	  // from: Route: 当前导航正要离开的路由
	  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
	  let isLogin = localStorage.blog_login ? true : false;  // 是否登录
	  if(to.path=='/login' || to.path=='/mlogin' || to.path=='/register'){
	  	next();
	  }else{
	  	//判断是否在登录状态下
	  	console.log(isLogin);
	  	isLogin ? next():next('/login');
	  }	
});


export default router;