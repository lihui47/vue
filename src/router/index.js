import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import Index from "../components/Index";
import CheckStaff from "../components/CheckStaff";
import ShowStaff from "../components/ShowStaff";
import Second from "../components/Second";
import Brand from "../components/Brand";
import First from "../components/First";
import ProductAttribute from "../components/ProductAttribute";
import ProductList from "../components/ProductList";
import WareHouse from "../components/WareHouse";
import GoIndentify from "../components/GoIndentify";
import updeteIdentifity from "../components/updeteIdentifity";
//vue框架引入
import axios from 'axios';//导入axios
//导入elementui
import ElementUI from 'element-ui';
//导入elementui
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$http=axios;
Vue.use(Router);
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


Vue.use(ElementUI);

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      component:Login
    },
    {
      path: '/register',
      component:Register
    },


    {
      path:'/index',
      component:Index,
      children:[
        {path: "first",component:First},
        {path:"second",component:Second},
        {path:"brand",component:Brand},
        {path:'checkStaff',component:CheckStaff},
        {path:'showStaff',component:ShowStaff},
        {path:'productAttribute',component:ProductAttribute},
        {path:'productList',component: ProductList},
        {path:'wareHouse',component: WareHouse},
        {path:'goIndentify',component: GoIndentify},
        {path:'UI',component: updeteIdentifity},
      ]
    }

  ]
});
//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  //debugger
  if (to.path === '/login') {
    next();
  }
  else if(to.path === '/register'){
    next();
  }
  else {
    let token = sessionStorage.getItem('Authorization');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;
