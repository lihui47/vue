<template>
<div>
  <!--主页-->
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><i class="el-icon-minus" @click="checkStaff"></i>审核用户</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-minus" @click="showStaff"></i>查看用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>仓库管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><i class="el-icon-minus" @click="wareHouse"></i>仓库配置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>商品配置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="showFirst"><i class="el-icon-minus" ></i>商品大类</el-menu-item>
            <el-menu-item index="1-2" @click="showSecond"><i class="el-icon-minus" ></i>商品小类</el-menu-item>
            <el-menu-item index="1-3" @click="showBrand"><i class="el-icon-minus" ></i>品牌管理</el-menu-item>
            <el-menu-item index="1-4" @click="showAttribute"><i class="el-icon-minus"></i>商品属性</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>评估鉴定</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><i class="el-icon-minus" @click="showList"></i>商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
      广沣共享典当管理平台
        <el-dropdown class="drown">
          <span class="el-dropdown-link">
    欢迎您!  {{this.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item ><a @click="userOut">注销</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <!--展示子组件 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  methods:{
    showFirst(){
      this.$router.push("/index/first");
    },
    showSecond(){
      this.$router.push("/index/second");
    },
    showBrand(){
      this.$router.push("/index/brand");
    },
    checkStaff(){
      this.$router.push("/index/checkStaff");
    },
    showStaff(){
     this.$router.push("/index/showStaff");
    },
    showAttribute(){
      this.$router.push("/index/productAttribute");
    },
    showList(){
      this.$router.push("/index/productList");
    },
    wareHouse(){
      this.$router.push("/index/wareHouse");
    },
    // showProductAttribute(){
    //   this.$router.push("/index/pr");
    // },
    showMenu(){
      this.$http.post("/")
    },
    userOut(){
      this.$router.push("/login");
      this.$router.push("/index/productAttribute");
    }
  },
  created() {
    // this.showMenu();
  },
  data(){
    return{
      user:JSON.parse(localStorage.getItem("user"))
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #606266;
  color: #C0C4CC;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
}

.el-aside {
  background-color: #303133;
  color: #C0C4CC;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 30px !important;
  max-height: 800px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.drown {
  margin-top: 0px;
  float: right;
}

/*控制页面展示大小*/
    .el-container{
        height: 700px;
    }
</style>
