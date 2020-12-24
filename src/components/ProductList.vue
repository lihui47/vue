<template>

  <div>
    <!--网页抬头部分-->
    <div id="top_parent_id1">
      <div id="top_child_id1">
      </div>

      <div id="top_child_id2">
        <span>筛选查询</span>
      </div>

      <div id="xialaikuang">
          <span>状态</span>
        <select id="u408-input" style="height: 31px" v-model="tableData.status">
          <option value="待鉴定">待鉴定</option>
          <option value="已鉴定">已鉴定</option>
        </select>
      </div>

      <div class="top_child_id4">
        <span>操作人</span>
        <input type="text" style="width: 60px;height: 28px" v-model="tableData.identitier">
      </div>



      <div class="top_child_id3">
        <span>商品名称</span>
        <input type="text" placeholder="请输入商品名称" style="height: 28px" v-model="tableData.name">
      </div>


      <div id="date">
        <div class="block" style="height: 10px" v-model="tableData.gmt_create">
          <span class="demonstration">录入日期:</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" >
          </el-date-picker>
        </div>
      </div>

      <div class="top_child_cls4">
        <el-button type="info" size="small" @click="criteria">查询</el-button>
      </div>
    </div>




    <!--表格-->
    <div id="tables">
      <div id="top_parent_id2">
          <div id="tables-1" >
              <span>数据列表</span>
          </div>


      </div>



      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          prop="id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="分类"
          width="210">

        </el-table-column>
        <el-table-column
          prop="price"
          label="首买价"
          width="196">
        </el-table-column>
        <el-table-column
          prop="writer"
          label="录入人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="identitier"
          label="鉴定人"
          width="120">
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope" >

            <el-button  size="medium"  type="danger" @click="goidentify(scope.$index, tableData)">鉴定</el-button>
            <el-button  size="medium"  @click="deletep(scope.$index, tableData)">删除</el-button>
            <el-button  size="medium"   @click="updetetIdentitier(scope.$index, tableData)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <!--分页部分-->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="3"
          layout="total, prev, pager, next"
          :total="pages.total">
        </el-pagination>
      </div>



    </div>
  </div>
</template>

<script>
  export default {

        data() {
              return {
                checked: true,
                tableData: [{
                  id: '',
                  name: '',
                  writer: '',
                  identitier:'',
                  gmt_create:'',
                  sname:'',
                  status:'',
                  price:'',
                }],

                //分页查询对象
                pages:{
                  current: 1,
                  sizePage: 3,
                  tableData:[],
                  pages:0,
                  total:0,
                },

                //条件分页查询对象
                // querypage:{
                //   name: '',
                //   identitier:'',
                //   gmt_create:'',
                //   status:'',
                // }

              }
            },


       methods: {
         //删除
         // open(index,tableData) {
         //         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         //           confirmButtonText: '确定',
         //           cancelButtonText: '取消',
         //           type: 'warning',

         //         }).then(() => {

         //           this.$message({
         //             type: 'success',
         //             message: '删除成功!'
         //           });
         //         }).catch(() => {
         //           this.$message({
         //             type: 'info',
         //             message: '已取消删除'
         //           });
         //         });
         //       },

          //删除
         deletep(index,tableData){
               this.$http.post("http://localhost:8888/identifity/deletepro",{
               id:tableData[index].id,
            }).then(
             data=>{
                console.log(data);
                 location.reload("/index/productList")
              }
           );
         },



         //跳转到修改页面
         updetetIdentitier(index,tableData){
          const id=tableData[index].id;
           sessionStorage.setItem("id",id);
           this.$router.push("/index/UI");

         },


         //分页展示的方法
         handleCurrentChange(val){
               console.log(`当前页: ${val}`),
               console.log(val),
               console.log()
               this.pages.sizePage=3,
               console.log(this.pages.sizePage)
               this.pages.current=val,
               console.log(this.pages.current)
               this.showAll();
           },

        //条件查询
         criteria(){
           const _this=this
           this.$http.get("http://localhost:8888/identifity/pro",{
             params:{
               sizePage:this.pages.sizePage,
               current:this.pages.current,
               name:this.tableData.name,
               identitier:this.tableData.identitier,
               gmt_create:this.tableData.gmt_create,
               status:this.tableData.status,

             }
           }).then(function(resp){
             console.log(resp)
            _this.tableData=resp.data.data.records
            _this.pages=resp.data.data

           })


         },
         //展示全部
         showAll(){
          const _this=this
           this.$http.get("http://localhost:8888/identifity/test",{
             params:{
               current:this.pages.current,
               sizePage:this.pages.sizePage
             }
           }).then(function(resp){
             console.log(resp)
              _this.tableData=resp.data.data.records
              _this.pages=resp.data.data
           })
         },
         //鉴定的方法
         goidentify(row,rows){
           const goId=rows[row].id;
           //将商品id存入session
           sessionStorage.setItem("goId",goId);
           const pname=rows[row].name;
           sessionStorage.setItem("pname",pname);
           const pwriter=rows[row].writer;
           sessionStorage.setItem("pwriter",pwriter);
           const ssname=rows[row].sname;
           sessionStorage.setItem("ssname",ssname);
           const pprice=rows[row].price;
           sessionStorage.setItem("pprice",pprice);
            //跳转到鉴定界面
           this.$router.push("/index/goIndentify");
         }

       },
         created(){
          this.showAll();



         }


    }


</script>

<style>

    #Header{
      background-color:#E4E4E4 ;
      border: 1px solid ;
      width: 100%;
      height: 20%;
      float: left;
      margin-top: 0.8%;

    }
    #tables{

      border: 0px hotpink solid ;
      width: 100%;
      height: 500px;
      float: left;
      margin-top: 0.6%;


    }

    #tables-1{
      border: 0px hotpink solid ;
      width: 6%;
      height: 100%;
      float: left;
      line-height: 70px;
      margin-left: 1%;
    }

    #tables-btn{
      border: 0px hotpink solid ;
      width: 50%;
      height: 100%;
      float: left;
      line-height: 70px;
      margin-left: 42%;
      padding-top: 0px;
      box-sizing: border-box;

    }

   td{
     border: 1px #B4BCCC solid ;
     text-align: center;

   }

   .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }


   .el-row {
       margin-bottom: 20px;
       &:last-child {
         margin-bottom: 0;

       }
     }
     .el-col {
       border-radius: 4px;
     }
     .bg-purple-dark {
       background: #E4E4E4;
     }
     .grid-content {
       border-radius: 4px;
       min-height: 40px;
     }

    #top_parent_id1{
      border: 0px #ff0e0e solid;
      width: 100%;
      height: 130px;
      background-color:whitesmoke;
    }

    #top_parent_id2{
      border: 0px #ff0e0e solid;
      width: 100%;
      height: 70px;
      background-color:whitesmoke;
    }

    #top_child_id1{
      border: 0px red solid;
      width: 30px;
      height: 30px;
      margin: 10px 0 0 0px;
      float: left;
    }

    #xialaikuang{
      border:0px red solid;
      width: 100px;
      height: 50px;
      float: left;
      box-sizing: border-box;
      padding-top: 8px;
      margin-left: 50px;
      font-size: 14px;
    }

    #top_child_id2{
      border: 0px red solid;
      width: 80px;
      height: 50px;
      margin: 0px 0 0 0px;
      float: left;
      text-align: center;
      line-height: 50px;
      box-sizing: border-box;
      font: 14px;
    }
    .top_child_id3{
      border:0px red solid;
      width: 250px;
      height: 50px;
      float: left;
      box-sizing: border-box;
      padding-top: 4.5px;
      margin-left: 20px;
      font-size: 14px;

    }
    #date{
      border:0px red solid;
      width: 500px;
      height: 50px;
      float: left;
      box-sizing: border-box;
      padding-top: 4.5px;
      margin-left: 10px;
      font-size: 14px;
    }

    .top_child_id4{
      border:0px red solid;
      width: 120px;
      height: 50px;
      float: left;
      box-sizing: border-box;
      padding-top: 4.5px;
      margin-left: 30px;
      font-size: 14px;

    }
    .top_child_cls4{
      border: 0px red solid;
      width: 80px;
      height: 50px;
      float: left;
      padding-top: 10px;
      box-sizing: border-box;
      font-size: 14px;
    }

    #updeteproduct{
      border: 1px red solid;

      width: 100%;
      height: 800px;
    }



</style>
