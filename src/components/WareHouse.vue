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
        <input type="text" placeholder="请输入仓库名称" v-model="likeCheck.name">
      </div>
      <div class="top_child_cls4">
        <el-button type="info" size="small" @click="likecheck">查询</el-button>
      </div>
      <div class="top_child_cls4" >
        <el-button @click="personalInfoDialog1 = true"  type="info" size="small">增加</el-button>
      </div>
    </div>
    <!--表格部分-->
    <el-table
      :data="records"
      border
      style="width: 100%; margin-top: 30px">
      <el-table-column
        fixed
        prop="id"
        label="仓库编号"
        width="150">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="仓库名称"
        width="150">
      </el-table-column>
      <el-table-column
        fixed
        prop="manager"
        label="负责人"
        width="150">
      </el-table-column>
      <el-table-column
        fixed
        prop="tel"
        label="联系电话"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="address"
        label="仓库地址"
        width="200">
      </el-table-column>
<!--      <el-table-column-->
<!--        fixed-->
<!--        prop="associatemouse"-->
<!--        label="关联仓库"-->
<!--        width="150">-->
<!--      </el-table-column>-->
      <el-table-column
        fixed
        prop="status"
        label="状态"
        width="150">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button  size="medium"  @click="deleteFirstid(scope.$index, records)">删除</el-button>
          <el-button  size="medium"  @click="getFirstid(scope.$index, records)">修改</el-button>
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
    <el-dialog title="修改仓库信息" :visible.sync="personalInfoDialog2" width="30%"  center>

      <el-form ref="u"  label-width="80px">
        <el-form-item label="仓库名称">
          <el-input type="text" v-model="warehouseInfo.name">{warehouseInfo.name}</el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input type="text" v-model="warehouseInfo.manager">{warehouseInfo.manager}</el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="text" v-model="warehouseInfo.tel">{warehouseInfo.tel}</el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input type="text" v-model="warehouseInfo.address">{warehouseInfo.address}</el-input>
        </el-form-item>
<!--        <el-form-item label="关联门店">-->
<!--          <el-input type="text" v-model="warehouseInfo.associatemouse">{warehouseInfo.associatemouse}</el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="状态">
          <el-input type="text" v-model="warehouseInfo.status">{warehouseInfo.status}</el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="5" :offset="4">
            <el-form-item >
              <el-button type="success" @click="changeFirstInfo">修改</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!--新增弹出框-->

    <el-dialog title="新增仓库信息" :visible.sync="personalInfoDialog1" width="30%"  center>

      <el-form ref="u"  label-width="80px">
        <el-form-item label="仓库名称">
          <el-input type="text" v-model="warehouseInfo.name" >{}</el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input type="text" v-model="warehouseInfo.manager"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="text" v-model="warehouseInfo.tel" ></el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input type="text" v-model="warehouseInfo.address"></el-input>
        </el-form-item>
<!--        <el-form-item label="关联门店">-->
<!--          <el-input type="text" v-model="warehouseInfo.associatemouse"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="状态">
          <el-input type="text" v-model="warehouseInfo.status"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="5" :offset="5">
            <el-form-item >
              <el-button type="success"   @click="InsertFirstInfo">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Index from './Index.vue';
export default {
  components: { Index },

  methods: {
    //删除的方法
    deleteFirstid(index,records){
      alert(records[index].id)
      this.$http.post("http://127.0.0.1:8888/warehouse/deleteHouse",{
        id:records[index].id,
      }).then(
        data=>{
          console.log(data);
          records.splice(index, 1);
          //location.reload()
        }
      );
    },
    //修改的方法
    getFirstid(index,records){
      this.personalInfoDialog2=true;
      console.log(records[index].id);
      this.warehouseInfo.id=records[index].id;
      this.warehouseInfo.name=records[index].name;
      this.warehouseInfo.manager=records[index].manager;
      this.warehouseInfo.tel=records[index].tel;
      this.warehouseInfo.address=records[index].address;
      this.warehouseInfo.associatemouse=records[index].associatemouse;
      this.warehouseInfo.status=records[index].status;
    },
    changeFirstInfo(){
      this.$http.post("http://127.0.0.1:8888/warehouse/updateHouse",
        // id:this.warehouseInfo.id,
        // name:this.warehouseInfo.name,
        // info:this.warehouseInfo.info
        this.warehouseInfo
      ).then(
        data=>{
          this.$message.success('修改成功'),
          console.log(data);
          this.personalInfoDialog2=false;
          location.reload()
        }
      );
    },

    //分页展示的方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pages.sizePage=this.pages.sizePage;
      this.pages.current=val;
      this.showFirstInfo();
    },
    //模糊查询
    likecheck(){
      this.$http.get("http://127.0.0.1:8888/warehouse/showHouse",
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
          this.showFirstInfo();
        }

      });
    },
    //分页查询请求的方法
    showFirstInfo(){
      this.$http.get("http://127.0.0.1:8888/warehouse/showHouse",
        {
          params:{
            current:this.pages.current,
            sizePage:this.pages.sizePage
          }
        }).then(data=>{
        console.log(data);
        this.pages.total=data.data.data.total;
        this.records=data.data.data.records;
      });
    },
    //新增大类的方法
    InsertFirstInfo(){
      this.$http.post("http://127.0.0.1:8888/warehouse/insertHouse",this.warehouseInfo).then(
        data=>{
          this.personalInfoDialog1=false
          location.reload()
          console.log(data)
          if(data.data.code==20001){
            alert(data.data.message)
          }

        }
      );
    },
    //失去焦点的方法
    blur(){
      const name1 = this.warehouseInfo.name;
       const manager = this.warehouseInfo.manager;
      // const ss = this.warehouseInfo.status;
      // const aa = this.warehouseInfo.address;
      // const bb = this.warehouseInfo.associatemouse;
      // const dd = this.warehouseInfo.tel;
      if(name1==""){
        this.$message.error('内容不能为空哦');
      }
    }
  },
  //钩子函数
  created(){
    this.showFirstInfo();
  },
  //监听方法
  watch:{
    likeCheck:{
      handler(){
        if(this.likeCheck.name==""){
          this.showFirstInfo();
        }
      },
      deep:true
    }
  },

  data() {
    return {
      warehouseInfo:{
        id:"",
        name:"",
        manager:'',
        tel:'',
        address:'',
        associatemouse:'',
        status:''
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
        id: '',
        name: '',
        other: ''
      }],
      personalInfoDialog1:false,
      personalInfoDialog2:false
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

