<template>
  <div>
    <el-page-header @back="goBack" content="鉴定详情">
    </el-page-header>
    <el-col :span="8" offset="8">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="编号" prop="id">
          <el-input v-model="ruleForm[0].id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="鉴定人" prop="identitier">
          <el-input v-model="ruleForm[0].identitier" ></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="sname">
          <el-input v-model="ruleForm[0].sname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm[0].name" ></el-input>
        </el-form-item>
        <el-form-item label="商品品牌" prop="brand">
          <el-input v-model="ruleForm[0].brand" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户首买价" prop="price">
          <el-input v-model="ruleForm[0].price" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新旧程度">
          <el-input v-model="ruleForm[0].oldnew" ></el-input>
          <el-select v-model="ruleForm[0].oldnew" placeholder="请选择产品新旧程度">
            <el-option label="9层新" value="9层新"></el-option>
            <el-option label="7层新" value="7层新"></el-option>
            <el-option label="5层新" value="5层新"></el-option>
            <el-option label="3层新" value="3层新"></el-option>
            <el-option label="全新" value="全新"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="鉴定结果" prop="indentifyresult">
          <el-radio-group v-model="ruleForm[0].indentifyresult">
            <el-radio label="鉴定为正品" value="正品"></el-radio>
            <el-radio label="鉴定为假货" value="假货"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="鉴定价格" prop="iprice">
          <el-input v-model="ruleForm[0].iprice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {

  data() {
    return {
      ruleForm:{
        id:'',
        name: '',
        price: '',
        brand: '',
        iprice: '',
        oldnew:'',
        indentifyresult:'',
        identitier:'',
        sname:'',
        status:''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$router.push("/index/productList");
    },
    goBack(){
      this.$router.push("/index/productList");
    },

    //更新数据
    submitForm(){
        console.log('2345',this.ruleForm);
       const user=sessionStorage.getItem('user');
       const id=sessionStorage.getItem("id");
        this.$http.get("http://localhost:8888/identifity/updateIden",{
          params:{
            id:id,
            identitier: user,
            identify_price:this.ruleForm[0].identify_price,
            newold:this.ruleForm[0].newold,
            indentifyresult:this.ruleForm[0].indentifyresult,

          }
        }).then((resp)=>{
          console.log(resp)
          if(resp.data.code==20000){
             alert(resp.data.message)
             this.$router.push("/index/productList");

          }else{
            alert(resp.data.message)
            this.$router.push("/index/UI");
          }
        })
    },
    //查询数据
    queryll(){

      const id=sessionStorage.getItem("id");
      console.log("获取到的ID",id);
      this.$http.get("http://localhost:8888/identifity/queryident",{
        params:{
          id:id
        }
      }).then((resp)=>{
          console.log(resp,'cv')
          this.ruleForm=resp.data.data
          console.log("sdf",this.ruleForm[0].id)
      })

    },



  },
  created(){
    this.queryll();



  },


}
</script>

<style scoped>

</style>
