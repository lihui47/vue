import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import CheckStaff from "../components/CheckStaff";
import ShowStaff from "../components/ShowStaff";
//vue框架引入
import axios from 'axios';//导入axios
//导入elementui
import ElementUI from 'element-ui';
//导入elementui
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$http=axios;
Vue.use(Router);
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
      path:'/index',
      component:Index,
      children:[
        {path: "first",component:Frist},
        {path:"second",component:Second},
        {path:"brand",component:Brand},
        {path:'checkStaff',component:CheckStaff},
        {path:'showStaff',component:ShowStaff}
      ]
    }

  ]
})
