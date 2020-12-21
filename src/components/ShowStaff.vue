<template>
<div>
    <div style="margin-top: 15px;">
      <el-col :span="9" >
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="状态" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>

          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
</div>

  <br><br><br>

  <el-table
    :data="tableData"
    border
    style="width: 600px">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">查看</el-button>
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
