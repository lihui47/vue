import Vue from 'vue';
import Router from 'vue-router';
import Login from "../components/Login";
import Register from "../components/Register";
import Frist from "../components/First";
import Second from "../components/Second";
import Brand from "../components/Brand";
import Index from "../components/Index";
import CheckStaff from "../components/CheckStaff";
import ShowStaff from "../components/ShowStaff";
//vue框架引入
import axios from 'axios';//导入axios
import ElementUI from 'element-ui';//导入elementui
import 'element-ui/lib/theme-chalk/index.css';
<<<<<<< HEAD


Vue.use(Router)
=======
Vue.prototype.$http=axios;
Vue.use(Router);
>>>>>>> 3f0b77eab80be96d0e5882a8c282136da0925fc5
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
<<<<<<< HEAD
      path: '/checkStaff',
      component:CheckStaff
    },
    {
      path: '/showStaff',
      component:ShowStaff
    },

=======
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
>>>>>>> 3f0b77eab80be96d0e5882a8c282136da0925fc5
  ]
})
