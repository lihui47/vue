<template>

  <div>
    <!--网页鉴定网页抬头部分-->
    <div class="top_parent_id1">
      <div id="top_child_id1">
      </div>

      <div id="top_child_id2">
        <span>筛选查询</span>
      </div>

      <div id="xialaikuang">
          <span>状态</span>
        <select id="u408-input" style="height: 31px">
          <option value="全部">全部</option>
          <option value="待鉴定">待鉴定</option>
          <option value="待评估">待评估</option>
          <option value="已评估">已评估</option>
          <option value="无效">无效</option>
        </select>
      </div>

      <div class="top_child_id4">
        <span>操作人</span>
        <input type="text" style="width: 60px;height: 28px">
      </div>



      <div class="top_child_id3">
        <span>模糊条件</span>
        <input type="text" placeholder="请输入商品大类名称" style="height: 28px">
      </div>


      <div id="date">
        <div class="block" style="height: 10px">
          <span class="demonstration">录入日期:</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>

      <div class="top_child_cls4">
        <el-button type="info" size="small">查询</el-button>
      </div>
    </div>




    <!--表格-->
    <div id="tables">
      <div class="top_parent_id1">
          <div id="tables-1" >
              <span>数据列表</span>
          </div>

        <!--点击新增删除事件-->
        <div id="tables-btn">
          <el-row>
            <el-button>新商品</el-button>
            <el-button type="primary">提交</el-button>
            <el-button type="success">修改</el-button>
            <el-button type="info">删除</el-button>
            <el-button type="warning">评估</el-button>
            <el-button type="danger">鉴定</el-button>
          </el-row>
        </div>

      </div>



      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="分类"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="author"
          label="录入人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="authenticate"
          label="鉴定人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="assess"
          label="评估人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="录入时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
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
                  number: '001',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄',
                  author:"张三",
                  authenticate:"李四",
                  assess:"王麻子",
                  time:"",
                  status:"",
                }],

              }
            },


       methods: {
         handleSelectionChange(val) {
           this.multipleSelection = val;
         },
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
      line-height: 50px;
      margin-left: 1%;
    }

    #tables-btn{
      border: 0px hotpink solid ;
      width: 50%;
      height: 100%;
      float: left;
      line-height: 50px;
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

    .top_parent_id1{
      border: 0px #ff0e0e solid;
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
      margin-left: 50px;
      font-size: 14px;

    }
    #date{
      border:0px red solid;
      width: 500px;
      height: 50px;
      float: left;
      box-sizing: border-box;
      padding-top: 4.5px;
      margin-left: 50px;
      font-size: 14px;
    }

    .top_child_id4{
      border:0px red solid;
      width: 120px;
      height: 50px;
      float: left;
      box-sizing: border-box;
      padding-top: 4.5px;
      margin-left: 50px;
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



</style>
