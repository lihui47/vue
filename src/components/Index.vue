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
            <el-menu-item index="1-2"><i class="el-icon-minus" @click="showStaff"></i>修改用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-s-home"></i>
          <span slot="title">仓库管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>商品配置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><i class="el-icon-minus" @click="showFirst"></i>商品大类</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-minus" @click="showSecond"></i>商品小类</el-menu-item>
            <el-menu-item index="1-3"><i class="el-icon-minus" @click="showBrand"></i>品牌管理</el-menu-item>
            <el-menu-item index="1-4"><i class="el-icon-minus"></i>商品属性</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>评估鉴定</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><i class="el-icon-minus"></i>商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
      广沣共享典当管理平台
        <el-dropdown class="drown">
          <span class="el-dropdown-link">
    欢迎您,tom!<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注销</el-dropdown-item>
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
  line-height: 160px;
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
