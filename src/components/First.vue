<template>
  <div>
  <div id="top_parent_id1">
    <div id="top_child_id1">
        <img src="../assets/搜索.png" width="100%">     
    </div>
    <div id="top_child_id2">      
        <span>筛选查询</span>
    </div>
    <div id="top_child_id3">
        <span>模糊条件</span>
        <input type="text" placeholder="请输入商品大类名称进行查询">
    </div>
    <div class="top_child_cls4">  
         <el-button type="info">查询</el-button>     
    </div>
    <div class="top_child_cls4">  
        <el-button type="info">新增</el-button>     
    </div>
  </div>
  
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="大类编号"
      width="350">
    </el-table-column>
     <el-table-column
      fixed
      prop="date"
      label="大类名称"
      width="350">
    </el-table-column>
     <el-table-column
      fixed
      prop="date"
      label="备注"
      width="450">
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
   </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style>
   #top_parent_id1{
       border: 1px red solid;
       width: 100%;
       height: 50px;
       background-color: rgb(228, 228, 228, 1);
   }
   #top_child_id1{
        border: 1px red solid;
        width: 30px;
        height: 30px;
        margin: 10px 0 0 0px;
        float: left;
   }
    #top_child_id2{
        border: 1px red solid;
        width: 80px;
        height: 50px;
        margin: 0px 0 0 0px;
        float: left;
        text-align: center;
        line-height: 50px;
        box-sizing: border-box;
   }
   #top_child_id3{
        border: 1px red solid;
        width: 500px;
        height: 50px;
        float: left;
        box-sizing: border-box;
        padding-top: 10px;
        margin-left: 650px;
   }
    .top_child_cls4{
        border: 1px red solid;
        width: 120px;
        height: 50px;
        float: left;
        padding-top: 5px;
        box-sizing: border-box;
   }
   

</style>