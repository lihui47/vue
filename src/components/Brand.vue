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
        <input type="text" placeholder="请输入品牌名称">
    </div>
    <div class="top_child_cls4">  
         <el-button type="info" size="small">查询</el-button>     
    </div>
    <div class="top_child_cls4">  
        <el-button type="info" size="small" @click="insertVisible = true">新增 </el-button>     
    </div>
  </div>
  <!--表格部分-->
  <el-table
    :data="tableData"
    border
    style="width: 100%, margin-top: 30px">
    <el-table-column
      fixed
      prop="date"
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
      prop="other"
      label="品牌首字母"
      width="450">
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)"  size="medium">删除</el-button>
        <el-button  size="medium" @click="dialogVisible = true">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页部分-->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
  <!--修改弹出框-->
  <el-dialog
    title="修改品牌信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <form>
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </form>
  </el-dialog>
  <!--新增弹出框-->
   <el-dialog
    title="新增品牌信息"
    :visible.sync="insertVisible "
    width="30%"
    :before-close="handleClose">
    <form>
       <el-button @click="insertVisible  = false">取 消</el-button>
       <el-button type="primary" @click="insertVisible  = false">确 定</el-button>
    </form>
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
      }
    },

    data() {
      return {
        tableData: [{
          date: '1',
          name: '古驰',
          other: 'GC'  
        }],
        dialogVisible: false,
        insertVisible:false
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