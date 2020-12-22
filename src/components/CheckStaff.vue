<template>

<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>审核用户</el-breadcrumb-item>
  </el-breadcrumb>
  <div >

      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="状态" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
          <el-option label="编号" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search(select,input3)"></el-button>
      </el-input>
  </div>

  <!--检查用户-->
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="300px">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="300px">

    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="400px">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index, scope.row,tableData)" type="text" size="small">通过</el-button>
        <el-button @click="handleClick1(scope.$index, scope.row,tableData)" type="text" size="small">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>



</div>

</template>

<script>
export default {
  methods: {

    //模糊查询
    search(select,input3){
      const _this=this
      this.$http.get("http://localhost:8888/check/blurSelect",{
          params:{
            select:select,
            input3:input3
          }
        }
      ).then((resp) => {

        _this.tableData=resp.data.data;

      })


    },
    handleClick(index, row, rows) {
      const _this=this;
      this.$alert('确认通过吗', '通过', {
        confirmButtonText: '确定',
        callback: action => {
          this.$http.get("http://localhost:8888/check/checkUser/",{
            params:{
              id:row.id,
              username:row.username,
              status:row.status
            }
            }
          ).then((resp) => {
            rows.splice(index, 1);
            this.$message({
              type: 'info',
              message: `已通过`
            });

          })

        }
      });
    },
    handleClick1(index, row, rows) {
      this.$alert('确认驳回吗', '驳回', {
        confirmButtonText: '确定',
        callback: action => {
          this.$http.get("http://localhost:8888/check/reject/", {
              params: {
                id: row.id,
                username: row.username,
                status: row.status
              }
            }
          ).then((resp) => {
            rows.splice(index, 1);
            this.$message({
              type: 'info',
              message: `已驳回`
            });

          })

        }
      });
    }
    },
  created() {
    const _this=this;
    this.$http.get("http://localhost:9090/check/showCheck"
    ).then((resp) => {
      _this.tableData=resp.data.data;

    })
  },
  data() {
    return {
      tableData: [{
        id: '',
        username: '',
        status: '',
      }
      ],
      input3:'',
      select:'',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4

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
