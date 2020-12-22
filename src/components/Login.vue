<template>
<div>
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
      <el-input v-model="ruleForm.name" placeholder="请输入用户名" ></el-input>
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
export default {
  methods:{
    // 登录方法
    login(){
      const _this=this;
      this.$http.get("http://localhost:9090/user/login",{
        params:{
          username:_this.ruleForm.username,
          password:_this.ruleForm.password
        }
      }).then((resp) => {
        console.log(resp)
        if(resp.data.code==20000){
          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          });
        }else if(resp.data.code==20002){
          _this.$router.push("/register")
        }else{

        }

      })

    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      checkList: ['选中且禁用','记住密码 | '],
      rules: {
        name: [
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

</style>
