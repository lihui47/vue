import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import CheckStaff from "../components/CheckStaff";
import ShowStaff from "../components/ShowStaff";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import First from "../components/First";
import ProductAttr from "../components/Product-attribute"
import ProductList from "../components/Product-list"


Vue.use(Router)
Vue.use(ElementUI);
export default new Router({
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
      path: '/checkStaff',
      component:CheckStaff
    },
    {
      path: '/showStaff',
      component:ShowStaff
    },
    {
      path: '/first',
      component:First
    },
    {
      path: '/proattr',
      component:ProductAttr
    },
    {
      path: '/productlist',
      component:ProductList
    }

  ]
})
