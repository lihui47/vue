<template>

<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>审核用户</el-breadcrumb-item>
  </el-breadcrumb>
  <el-badge :value="pages.total" class="item" style="float: right">
    <el-button size="small">待处理</el-button>
  </el-badge>
  <div style="margin-top: 20px;margin-bottom: 20px">

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
      width="264px">
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

</template>

<script>
export default {
  methods: {
    //分页展示的方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pages.size = this.pages.size;
      this.pages.current = val;
      this.showFirstInfo();
    },
    //模糊查询
    search(select, input3) {
      const _this = this
      this.$http.get("http://localhost:8888/check/blurSelect", {
          params: {
            select: select,
            input3: input3
          }
        }
      ).then((resp) => {

        _this.tableData = resp.data.data;

      })


    },
    handleClick(index, row, rows) {
      const _this = this;
      this.$alert('确认通过吗', '通过', {
        confirmButtonText: '确定',
        callback: action => {
          this.$http.get("http://localhost:8888/check/checkUser/", {
            params: {
              id: row.id,
              username: row.username,
              status: row.status
            }
            }
          ).then((resp) => {
            rows.splice(index, 1);
            _this.pages.total=this.pages.total-1;
            this.$message({
              type: 'info',
              message: `已通过`
            });
            location.reload()
          })

        }
      });
    },
    handleClick1(index, row, rows) {
      const _this=this;
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
            _this.pages.total=this.pages.total-1;
            this.$message({
              type: 'info',
              message: `已驳回`
            });

          })

        }
      });
    },
    // showAll(){
    //   const _this=this;
    //   this.$http.get("http://localhost:8888/check/showCheck"
    //   ).then((resp) => {
    //     _this.tableData=resp.data.data;
    //
    //   })
    // }
    // },
    //分页查询请求的方法
    showAll() {
      this.$http.get("http://127.0.0.1:8888/check/showCheck",
        {
          params: {
            current: this.pages.current,
            size: this.pages.size
          }
        }).then(data => {
        console.log(data);
        console.log(data);
        this.pages.total = data.data.data.total;
        this.records = data.data.data.records;
        this.tableData = data.data.data.records
      });
    }
    },

  created() {
    this.showAll();
  },
  // watch(){
  //   const aa=this.input3;
  //   if(aa==null){
  //     const _this=this;
  //     this.$http.get("http://localhost:8888/check/showCheck"
  //     ).then((resp) => {
  //       _this.tableData=resp.data.data;
  //
  //     })
  //   }
  // },
  //监听方法
  watch:{
    input3:{
      handler(){
        if(this.input3==''){
          this.showAll();
        }
      },
      deep:true
    }
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
      currentPage4: 4,
    //分页查询对象
    pages:{
        current:1,
        size: 3,
        records:[],
        pages:0,
        total:0,
    }

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
