<template>
  <div>
    <!--注册页面-->
    <el-col :span="8" offset="8">
      <h1>广沣共享典当管理平台</h1><br/>
      <h1></h1>
      <form style="background: ghostwhite;height: 350px;border-radius: 5%" >
        <br>
        <h2>注册</h2>
        <br>
        <el-col offset="2" :span="18" >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="用户名" prop="name"  >
              <el-input v-model="ruleForm.username" placeholder="请输入用户名" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
              <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password ></el-input>
            </el-form-item>
            <el-col   >
              <el-row >
                <el-checkbox-group v-model="checkList">
                  <el-button type="info"  round @click="register">立即注册</el-button>
                </el-checkbox-group>
              </el-row>

            </el-col>
            <el-col>
              <el-divider ><el-link href="/login" target="_blank">已注册，去登陆</el-link></el-divider>
            </el-col>
          </el-form>
        </el-col>
      </form>
    </el-col>

  </div>
</template>

<script>
export default {
  methods: {
    register(){
      this.$http.post("http://localhost:8888/user/register",this.ruleForm).then(resp=> {
        console.log(resp)
        if(resp.data.code===20000){
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success'
          });
          this.$router.push("/login")
        }else if(resp.data.code===20004){
          this.$message({
            showClose: true,
            message: '用户已存在',
            center:true,
            type: 'error'
          });
        }else{

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

</style>
