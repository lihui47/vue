<template>
  <div>
    <!--网页抬头部分-->
    <div id="top_parent_id1">
      <div id="top_child_id1">
        <img src="../assets/搜索.png" width="30px">
      </div>
      <div id="top_child_id2">
        <span>筛选查询</span>
      </div>
      <div id="top_child_id3">
        <span>模糊条件</span>
        <label>
          <input type="text" placeholder="请输入品牌名称" v-model="like.name"/>
        </label>
      </div>
      <div class="top_child_cls4">
        <el-button type="info" size="small" @click="queryLikely">查询</el-button>
      </div>
      <div class="top_child_cls4">
        <el-button type="info" size="small" @click="personalInfoDialog1 = true" >新增 </el-button>
      </div>
    </div>
    <!--品牌表格部分-->
    <el-table
      :data="records"
      border
      style="width: 100%; margin-top:30px">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="350">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="品牌名称"
        width="350">
      </el-table-column>
      <el-table-column
        fixed
        prop="abbr"
        label="品牌缩写"
        width="450">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button  @click="deleteBrand(scope.$index, records)"  size="medium">删除</el-button>
          <el-button  size="medium" @click="getBrandId(scope.$index, records)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页部分-->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="this.pages.total">
      </el-pagination>
    </div>
    <!--修改弹出框-->
    <el-dialog title="修改品牌信息" :visible.sync="personalInfoDialog2" width="30%"  center>

      <el-form ref="u"  label-width="80px">
        <el-form-item label="品牌名称">
          <el-input type="text" v-model="BrandInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input type="text" v-model="BrandInfo.abbr"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="5" :offset="4">
            <el-form-item >
              <el-button type="success" @click="changeBrandInfo">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--新增弹出框-->
    <el-dialog title="添加商品品牌信息" :visible.sync="personalInfoDialog1" width="30%"  center>

      <el-form ref="u"  label-width="80px">
        <el-form-item label="品牌名称">
          <el-input type="text" v-model="BrandInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌缩写">
          <el-input type="text" v-model="BrandInfo.abbr"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="5" :offset="5">
            <el-form-item >
              <el-button type="success"   @click="InsertBrandInfo">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //分页展示的方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pages.current=val;
      this.showBrandInfo();
    },
    //模糊查询
    queryLikely(){
      this.$http.get("http://127.0.0.1:8888/brand/queryLikely",
        {
          params:{
            id:this.like.id,
            name:this.like.name,
            current:this.pages.current,
            sizePage:this.pages.sizePage
          }}).then(data=>{
        console.log(data);
        if(data.data.data!=null){
          this.pages.total=data.data.data.total;
          this.records=data.data.data.records;
        }else{
          this.showBrandInfo();
        }

      });
    },
    //分页查询请求的方法
    showBrandInfo(){
      this.$http.get("http://localhost:8888/brand/queryBrands",
        {
          params:{
            current:this.pages.current,
            sizePage:this.pages.sizePage
          }
        }).then(resp=>{
        console.log(resp);
        this.pages.total=resp.data.data.total;
        this.records=resp.data.data.records;
      });
    },
    //修改的方法
    getBrandId(index,records){
      this.personalInfoDialog2=true;
      console.log(records[index].id);
      this.BrandInfo.id=records[index].id;

    },
    changeBrandInfo(){
      this.$http.post("http://127.0.0.1:8888/brand/update",{
        id:this.BrandInfo.id,
        name:this.BrandInfo.name,
        abbr:this.BrandInfo.abbr
      }).then(
        data=>{
          if(data.data.code===20000){
            this.personalInfoDialog2=false;
            location.reload()
          }else{
            this.$message({
              showClose: true,
              message: '输入有误,修改失败',
              center:true,
              type: 'error'
            });
            this.personalInfoDialog2=false;
        }

      }
      );
    },
    //新增品牌
    InsertBrandInfo(){
      this.$http.post("http://127.0.0.1:8888/brand/insert",this.BrandInfo).then(
        data=>{
          if(data.data.code===20001){
            this.$message({
              showClose: true,
              message: '输入有误,修改失败',
              center:true,
              type: 'error'
            });
            this.personalInfoDialog1=false
          }else {
            this.personalInfoDialog1=false
            alert("新增成功")
            location.reload()
          }

        }
      );
    },
    //删除的方法
    deleteBrand(index,records){
      this.$http.post("http://127.0.0.1:8888/brand/deleteBrand",{
        id:records[index].id,
      }).then(
        data=>{
          alert("删除成功")
          location.reload()
        }
      );
    }
  },
  //钩子函数
  created(){
    this.showBrandInfo();
  },

  data() {
    return {
      BrandInfo:{
        id:"",
        name:"",
        abbr:""
      },
      //封装的数据对象
      records: [{
        id: '',
        name: '',
        abbr: ''
      }],
      //模糊查询对象
      like:{
        id:'',
        name:''
      },
      personalInfoDialog2: false,
      personalInfoDialog1:false,
      insertVisible:false,

      //分页查询对象
      pages:{
        current:1,
        sizePage: 5,
        records:[],
        pages:0,
        total:0,
      },
      //
    }
  }
}
</script>

<style>
#top_parent_id1{
  border: 0px red solid;
  width: 100%;
  height: 50px;
  background-color:whitesmoke;
  float: left;
  box-sizing: border-box;
}
#top_child_id1{
  border: 0px red solid;
  width: 50px;
  height: 50px;
  float: left;
  text-align: center;
  line-height: 50px;
  box-sizing: border-box;
}
#top_child_id2{
  border: 0px red solid;
  width: 80px;
  height: 50px;
  float: left;
  text-align: center;
  line-height: 50px;
  box-sizing: border-box;
  font-size: 14px;
}
#top_child_id3{
  border:0px red solid;
  width: 300px;
  height: 50px;
  float: left;
  box-sizing: border-box;
  padding-top: 0px;
  margin-left: 550px;
  font-size: 14px;
  line-height: 50px;

}
.top_child_cls4{
  border: 0px red solid;
  width: 100px;
  height: 50px;
  float: left;
  padding-top: 0px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 50px;
}


</style>
