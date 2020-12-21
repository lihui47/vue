<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>查看用户</el-breadcrumb-item>
  </el-breadcrumb>
    <div style="margin-top: 15px;">

        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="状态" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>

          </el-select>
          <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
        </el-input>

</div>

  <br><br><br>

  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="300">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="400">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" size="small" type="primary" icon="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>


<script>
export default {
  methods: {
    handleClick(row) {
      this.$alert('确认删除吗', '删除', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `删除成功`
          });
        }
      });
    }
  },
  data() {
    return {
      tableData: [{
        id: 1,
        username: '王小虎',
        status: '已申请',
      },
        {
          id: 1,
          username: '王小虎',
          status: '已申请',
        },
        {
          id: 1,
          username: '王小虎',
          status: '已申请',
        }
      ],
      input3:'',
      select:''
    }
  }

}
</script>

<style scoped>
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
