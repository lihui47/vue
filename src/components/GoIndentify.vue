<template>
<div>
  <el-page-header @back="goBack" content="鉴定详情">
  </el-page-header>
  <el-col :span="8" offset="8">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input v-model="ruleForm.id">{ruleForm.id}</el-input>
    </el-form-item>
    <el-form-item label="提交人" prop="writer">
      <el-input v-model="ruleForm.writer">{ruleForm.writer}</el-input>
    </el-form-item>
    <el-form-item label="商品分类" prop="type1">
      <el-input v-model="ruleForm.type1">{ruleForm.type1}</el-input>
    </el-form-item>
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="ruleForm.name">{ruleForm.name}</el-input>
    </el-form-item>
    <el-form-item label="客户首买价" prop="price">
      <el-input v-model="ruleForm.price">{ruleForm.price}</el-input>
    </el-form-item>
    <el-form-item label="新旧程度">
      <el-select v-model="ruleForm.oldnew" placeholder="请选择产品新旧程度">
        <el-option label="9层新" value="9层新"></el-option>
        <el-option label="7层新" value="7层新"></el-option>
        <el-option label="5层新" value="5层新"></el-option>
        <el-option label="3层新" value="3层新"></el-option>
        <el-option label="全新" value="全新"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="鉴定结果" prop="resource">
      <el-radio-group v-model="ruleForm.indentifyresult">
        <el-radio label="鉴定为正品" value="正品"></el-radio>
        <el-radio label="鉴定为假货" value="假货"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="鉴定价" prop="identify_price">
      <el-input v-model="ruleForm.identify_price"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">鉴定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-col>
</div>
</template>

<script>
export default {

  data() {
    return {
      ruleForm: {
        id:'',
        name: '',
        writer: '',
        identitier:'',
        type1:'',
        price:'',
        oldnew:'',
        indentifyresult:'',
        identify_price:'',
        status:''

      },
      rules: {

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
          this.$http.get("http://127.0.0.1:8888/go/addIndentify",{
            params:{
              id:this.ruleForm.id,
              identitier:this.ruleForm.identitier,
              identify_price:this.ruleForm.identify_price,
              oldnew:this.ruleForm.oldnew,
              indentifyresult:this.ruleForm.indentifyresult,
              status:'已鉴定',
            }
          }).then(
            alert('鉴定成功!'),
            this.$router.push("/index/productList")
          );
        } else {
          alert('数据不能为空!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //this.ruleForm.oldnew='', this.ruleForm.indentifyresult='',
        //this.ruleForm.identify_price=''
    },
    goBack() {
      this.$router.push("/index/pro");
    },

  },
  created(){

    this.ruleForm.id=sessionStorage.getItem("goId");
    this.ruleForm.name=sessionStorage.getItem("pname");
    this.ruleForm.writer=sessionStorage.getItem("pwriter");
    this.ruleForm.type1=sessionStorage.getItem("ssname");
    this.ruleForm.price=sessionStorage.getItem("pprice");
    sessionStorage.setItem("user","tom");
    this.ruleForm.identitier=sessionStorage.getItem("user");
  }


}
</script>

<style scoped>

</style>
