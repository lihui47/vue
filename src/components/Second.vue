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
    <div id="top_child_id2_1">
        <el-dropdown >
            <span class="el-dropdown-link" @click="checkFirst">
                大类筛选<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown"  >
                <el-dropdown-item v-for="info in FirstInfo" :key="info.id" >
                  <span @click="checkInfo(info.id)">{{info.name}}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div id="top_child_id3">
        <span>一级目录模糊  查询</span>
        <input type="text" placeholder="请输入商品小类名称" v-model="likeCheck.name">
    </div>
    <div class="top_child_cls4">
         <el-button type="info" size="small" @click="likecheck">查询</el-button>
    </div>
    <div class="top_child_cls4">
        <el-button type="info" size="small" @click="personalInfoDialog1 = true">新增 </el-button>
    </div>
  </div>
  <!--网页表格部分-->
  <el-table
    :data="records"
    border
    style="width: 100%, margin-top: 30px">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="300">
    </el-table-column>
     <el-table-column
      fixed
      prop="secondName"
      label="分类名称"
      width="300">
    </el-table-column>
     <el-table-column
      fixed
      prop="name"
      label="所属大类"
      width="200">
    </el-table-column>
    <el-table-column
      fixed
      prop="level"
      label="级别"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="danwei"
      label="单位"
      width="150">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope" >
        <el-button size="medium" @click="deleteSecondid(scope.$index, records)">删除</el-button>
        <el-button size="medium" @click="getSecond(scope.$index, records)" >修改</el-button>
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
    <el-dialog title="修改商品小类信息" :visible.sync="personalInfoDialog2" width="30%"  center>
          <el-form ref="u"  label-width="80px">
                <el-form-item label="小类名称">
                    <el-input type="text" v-model="SecondInfo.secondName"></el-input>
                </el-form-item>
                <el-form-item label="所属大类">
                    <el-input type="text" v-model="SecondInfo.name"></el-input>
                </el-form-item>
              <el-row :gutter="20">
                  <el-col :span="5" :offset="4">
                      <el-form-item >
                          <el-button type="success" @click="changeSecond">提交</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
    </el-dialog>
  <!--新增弹出框-->
    <el-dialog title="添加商品小类信息" :visible.sync="personalInfoDialog1" width="30%"  center>

          <el-form ref="u"  label-width="80px">
                <el-form-item label="小类名称">
                    <el-input type="text" v-model="SecondInfo.secondName"></el-input>
                </el-form-item>
                <el-form-item label="所属大类">
                    <el-input type="text" v-model="SecondInfo.name"></el-input>
                </el-form-item>
              <el-row :gutter="20">
                  <el-col :span="5" :offset="5">
                      <el-form-item >
                          <el-button type="success" @click="InsertSecondInfo">提交</el-button>
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
       //根据大类查询小类名称
       checkInfo(id){
          this.$http.get("http://127.0.0.1:8888/second/checkFirstId",{
            params:{
              id:id,
              current:this.pages.current,
              sizePage:this.pages.sizePage
            }
          }).then(data=>{
            this.pages.total=data.data.data.total;
            this.records=data.data.data.records;
         })
       },
       //大类筛选的方法
       checkFirst(){
         this.$http.get("http://127.0.0.1:8888/second/checkFirst").then(data=>{
            this.FirstInfo=data.data.data;
         })
       },
       //删除的方法
      deleteSecondid(index,records){
            this.$http.post("http://127.0.0.1:8888/second/deleteSecond",{
            id:records[index].id,
         }).then(
          data=>{
             console.log(data);
             location.reload();
           }
        );
      },
       //修改的方法
      getSecond(index,records){
        this.personalInfoDialog2=true;
        console.log(records[index].id);
        this.SecondInfo.id=records[index].id;

      },
      changeSecond(){
         this.$http.post("http://127.0.0.1:8888/second/updataSecond",{
            id:this.SecondInfo.id,
            name:this.SecondInfo.name,
            secondName:this.SecondInfo.secondName
         }).then(
          data=>{
             console.log(data);
             this.personalInfoDialog2=false;
             location.reload();
           }
        );
      },
      //模糊查询
      likecheck(){
        this.$http.get("http://127.0.0.1:8888/second/likeSecond",
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
                this.showSecondInfo();
              }

            });
      },
      //分页展示的方法
      handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pages.sizePage=this.pages.sizePage;
            this.pages.current=val;
            this.showSecondInfo();
        },
        //分页查询请求的方法
      showSecondInfo(){
        this.$http.get("http://127.0.0.1:8888/second/querySecond",
          {
            params:{
                 current:this.pages.current,
                 sizePage:this.pages.sizePage
            }
        }).then(data=>{
          console.log(data);
          this.pages.total=data.data.data.total;
          this.records=data.data.data.records

        });
      },
      //新增大类的方法
      InsertSecondInfo(){
        this.$http.post("http://127.0.0.1:8888/second/insertSecond",this.SecondInfo).then(
          data=>{
             this.personalInfoDialog1=false
            //  location.reload()
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
      this.showSecondInfo();
    },

    data() {
      return {
        //大类信息
        FirstInfo:[],
        //新增的对象
         SecondInfo:{
            id:"",
            name:"",
            secondName:""
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
          id:'',
          secondName: '',
          name:'',
          level:"",
          danwei:""
        }],
        personalInfoDialog1:false,
        personalInfoDialog2:false
      }
    }
  }
</script>

<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #666666;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
   #top_parent_id1{
       border: 0px red solid;
       width: 100%;
       height: 50px;
       background-color:whitesmoke;
   }
   #top_child_id1{
        border: 0px red solid;
        width: 30px;
        height: 30px;
        margin: 10px 0 0 0px;
        float: left;
   }
   #top_child_id2_1{
        border: 0px red solid;
        width: 80px;
        height: 30px;
        margin: 15px 0 0 0px;
        float: left;
        line-height: 20px;
   }
    #top_child_id2{
        border: 0px red solid;
        width: 80px;
        height: 50px;
        float: left;
        text-align: center;
        line-height: 60px;
        box-sizing: border-box;
        font: 14px;
   }
   #top_child_id3{
        border:0px red solid;
        width: 400px;
        height: 50px;
        float: left;
        box-sizing: border-box;
        padding-top: 0px;
        margin-left: 350px;
        font-size: 14px;

   }
    .top_child_cls4{
        border: 0px red solid;
        width: 80px;
        height: 50px;
        float: left;
        padding-top: 0px;
        box-sizing: border-box;
        font-size: 14px;
   }


</style>
