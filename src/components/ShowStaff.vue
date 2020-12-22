<template>
<div>
  <!--用户展示-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>查看用户</el-breadcrumb-item>
  </el-breadcrumb>
    <div >
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="状态" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>

          </el-select>
          <el-button slot="append" icon="el-icon-search" type="primary" @click="search(select,input3)">搜索</el-button>
        </el-input>

</div>
  <el-table
    :data="tableData.records"
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
        <el-button @click="delete11(scope.$index, scope.row,tableData)" size="small" type="primary" icon="el-icon-delete" :plain="true">删除</el-button>
        <el-button @click="write(scope.row)" type="primary" icon="el-icon-edit" circle ></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage1"
    :page-sizes="[3, 5, 10, 15]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total">
  </el-pagination>
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
    //分页查询
    handleSizeChange(val) {
      this.findAll(val,this.tableData.current)
    },
    handleCurrentChange(val) {
      this.findAll(this.tableData.size,val)
    },
    findAll(size,current){
      console.log(size)
      const _this=this
      this.$http.get("http://localhost:8888/check/AllUser",{
        params:{
          size:size,
          current:current
        }
      }).then((resp)=>{
        console.log(resp.data.data)
        _this.tableData=resp.data.data
        _this.tableData.records=resp.data.data.records
      })
    },
    //删除操作
    delete11(index, row, rows) {
      console.log(index)
      console.log(row)
      this.$alert('确认删除吗', '删除', {
        confirmButtonText: '确定',
        callback: action => {
          this.$http.get("http://localhost:8888/check/deleteUser", {
              params: {
                id:row.id
              }
            }
          ).then((resp) => {
            //rows.splice(index, 1);
            location.reload("/index/showStaff")
            this.$message({
              message: '删除成功',
              type: 'success'
            });

          })
        }
      })
    }
    },
  //编辑
  write(row) {
        this.$confirm('此操作是禁用用户操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
    },

    data() {
      return {
        tableData: {
            records:[],//城市数据
            size: 3,//每页记录数
            pages: "",//总页数
            current: 1,//当前页数
            total:""//总条数
        },
        input3: '',
        select: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
  created() {
    this.findAll(this.tableData.size,this.tableData.current);
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
