<template>
<div class="bg">
  <!--登录页面-->
  <el-col :span="8" offset="8">
    <h1>广沣共享典当管理平台</h1><br/>
   <h1></h1>
    <form style="background: ghostwhite;height: 350px;border-radius: 5%" >
      <br>
      <h2>登陆</h2>
    <br>
      <el-col offset="2" :span="18" >
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
    <el-form-item label="用户名" prop="name"  >
      <el-input v-model="ruleForm.username" placeholder="请输入用户名" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" >
      <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password ></el-input>
    </el-form-item>
    <el-col  offset="4" >
    <el-row >
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="记住密码 | " style="margin-right: 20px"></el-checkbox>
        <el-button type="info"  round @click="login">登陆</el-button>
      </el-checkbox-group>
    </el-row>

    </el-col>
      <el-col>
    <el-divider ><el-link href="register" target="_blank">注册有惊喜</el-link></el-divider>
      </el-col>
  </el-form>
      </el-col>
    </form>
  </el-col>

</div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  methods:{
    ...mapMutations(['changeLogin']),
    // 登录方法
    login(){
      this.$http.post("http://localhost:8888/user/login",this.ruleForm).then(resp => {
        localStorage.setItem("user",JSON.stringify(this.ruleForm))
        console.log(resp)
        if(resp.data.code===20000){
          this.Token=resp.data.data
          // 将用户token保存到vuex中
          this.changeLogin({ Authorization: this.Token });
          this.$router.push("/index")
        }else if(resp.data.code===20003){
          this.$message.error('用户不存在');
          this.$router.push("register")
        }else if(resp.data.code===20004){
          this.$message.error('该用户还没有审核');
          this.$router.push("login")
        }
        else if(resp.data.code===20002){
          this.$message.error('密码错误');
          this.$router.push("login")
        }else{
          this.$message.error('输入有误');
          this.$router.push("login")
        }
      })
    }
  },
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      checkList: ['选中且禁用','记住密码 | '],
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 8, message: '密码需要3-8位', trigger: 'blur'}
        ],
      }
    }
  },
}
</script>

<style scoped>
.bg{
  background-size: 100% 100%;
  background-image: url("../assets/背景图.jpg");
}
</style>
