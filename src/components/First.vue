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
        <input type="text" placeholder="请输入商品大类名称" v-model="likeCheck.name">
    </div>
    <div class="top_child_cls4">  
         <el-button type="info" size="small" @click="likecheck">查询</el-button>     
    </div>
    <div class="top_child_cls4" >  
         <el-button @click="personalInfoDialog1 = true"  type="info" size="small">增加</el-button>   
    </div>
  </div>
  <!--表格部分-->
  <el-table
    :data="records"
    border
    style="width: 100%, margin-top: 30px">
    <el-table-column
      fixed
      prop="id"
      label="大类编号"
      width="350">
    </el-table-column>
     <el-table-column
      fixed
      prop="name"
      label="大类名称"
      width="350">
    </el-table-column>
     <el-table-column
      fixed
      prop="other"
      label="备注"
      width="450">
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button  size="medium"  @click="deleteFirstid(scope.$index, tableData)">删除</el-button>
        <el-button  size="medium"  @click="getFirstid(scope.$index, tableData)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页部分-->
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="3"
      layout="total, prev, pager, next"
      :total="pages.total">
    </el-pagination>
  </div>
  <!--修改弹出框-->
 <el-dialog title="修改商品大类信息" :visible.sync="personalInfoDialog2" width="30%"  center>
      
          <el-form ref="u"  label-width="80px">
                <el-form-item label="大类名称">
                    <el-input type="text" v-model="FirstInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="大类描述">
                    <el-input type="text" v-model="FirstInfo.info"></el-input>
                </el-form-item>
              <el-row :gutter="20">
                  <el-col :span="5" :offset="4">
                      <el-form-item >
                          <el-button type="success" @click="changeFirstInfo">提交</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
    </el-dialog>
       
  <!--新增弹出框-->

    <el-dialog title="添加商品大类信息" :visible.sync="personalInfoDialog1" width="30%"  center>
      
          <el-form ref="u"  label-width="80px">
                <el-form-item label="大类名称">
                    <el-input type="text" v-model="FirstInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="大类描述">
                    <el-input type="text" v-model="FirstInfo.info"></el-input>
                </el-form-item>
              <el-row :gutter="20">
                  <el-col :span="5" :offset="5">
                      <el-form-item >
                          <el-button type="success"   @click="InsertFirstInfo">提交</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
    </el-dialog>
</div>
</template>

<script>
import Index from './Index.vue';
  export default {
  components: { Index },

    methods: {
      //删除的方法
      deleteFirstid(index,records){
            this.$http.post("http://127.0.0.1:9999/first/deleteFirst",{
            id:records[index].id,
         }).then(
          data=>{
             console.log(data);
              location.reload()
           }
        );
      },
      //修改的方法
      getFirstid(index,records){
        this.personalInfoDialog2=true;
        console.log(records[index].id);
        this.FirstInfo.id=records[index].id;
         
      },
      changeFirstInfo(){
         this.$http.post("http://127.0.0.1:9999/first/updataFirst",{
            id:this.FirstInfo.id,
            name:this.FirstInfo.name,
            info:this.FirstInfo.info
         }).then(
          data=>{
             console.log(data);
             this.personalInfoDialog2=false;
             location.reload()
           }
        );
      },
      
      //分页展示的方法
      handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pages.sizePage=this.pages.sizePage;
            this.pages.current=val;
            this.showFirstInfo();
        },
      //模糊查询
      likecheck(){
        this.$http.get("http://127.0.0.1:9999/first/likeFirst",
          {
            params:{
                 id:this.likeCheck.id,
                 name:this.likeCheck.name,
                 current:this.pages.current,
                 sizePage:this.pages.sizePage                 
            }}).then(data=>{
              console.log(data);
              if(data.data.data!=null){
                this.pages.total=data.data.data.total;
                this.records=data.data.data.records;
              }else{
                this.showFirstInfo();
              }
              
            });
      },
      //分页查询请求的方法
      showFirstInfo(){
        this.$http.get("http://127.0.0.1:9999/first/queryFirst",
          {
            params:{
                 current:this.pages.current,
                 sizePage:this.pages.sizePage  
            }
        }).then(data=>{
          console.log(data);
          this.pages.total=data.data.data.total;
          this.records=data.data.data.records;
        });
      },
      //新增大类的方法
      InsertFirstInfo(){
        this.$http.post("http://127.0.0.1:9999/first/insertFirst",this.FirstInfo).then(
          data=>{
             this.personalInfoDialog1=false
             location.reload()
             console.log(data)
             if(data.data.code==20001){
               alert(data.data.message)
             }
             
           }
        );
      }
    },
    //钩子函数
    created(){
         this.showFirstInfo();
    },

    data() {
      return {
         FirstInfo:{
            id:"",
            name:"",
            info:""
         },
         //模糊查询对象
         likeCheck:{
            id:"",
            name:""
         },
         //分页查询对象
         pages:{
            current:1,
            sizePage: 3,
            records:[],
            pages:0,
            total:0,
          },
         //封装的数据对象
         records: [{
            id: '',
            name: '',
            other: '' 
          }],
        personalInfoDialog1:false,
        personalInfoDialog2:false
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