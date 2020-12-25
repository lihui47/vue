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
        <input type="text" placeholder="请输入商品大类名称" v-model="likeCheck.name">
      </div>
      <div class="top_child_cls4">
        <el-button type="info" size="small" @click="likecheck">查询</el-button>
      </div>
      <div class="top_child_cls4">
        <el-button type="info" size="small" @click="personalInfoDialog1 = true">新增 </el-button>
      </div>
    </div>
    <!--表格部分-->
    <el-table
      :data="records"
      border
      style="width: 100%;margin-top: 30px">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="商品名称"
        width="300">
      </el-table-column>
      <el-table-column
        fixed
        prop="secondName"
        label="分类名称"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="number"
        label="数量"
        width="100">
      </el-table-column>
      <el-table-column
        fixed
        prop="price"
        label="价格"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="status"
        label="状态"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope" >
          <el-button  size="medium" @click="deleteProductAttr(scope.$index, records)">删除</el-button>
          <el-button  size="medium" @click="getProductAttr(scope.$index, records)">修改</el-button>
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
    <el-dialog title="修改商品小类信息" :visible.sync="personalInfoDialog2" width="30%"  center>
          <el-form ref="u"  label-width="80px">
                <el-form-item label="商品名称">
                    <el-input type="text" v-model="ProductInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="所属分类">
                    <el-input type="text" v-model="ProductInfo.secondName" ></el-input>
                </el-form-item>
                 <el-form-item label="录入数量">
                    <el-input type="text" v-model="ProductInfo.number"></el-input>
                </el-form-item>
                <el-form-item label="单品价格">
                    <el-input type="text" v-model="ProductInfo.price"></el-input>
                </el-form-item>
                <el-form-item label="商品状态">
                    <el-input type="text" v-model="ProductInfo.statusName"></el-input>
                </el-form-item>
              <el-row :gutter="20">
                  <el-col :span="5" :offset="4">
                      <el-form-item >
                          <el-button type="success" @click="changeProductAttr" >提交</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
    </el-dialog>
    <!--新增弹出框-->
    <el-dialog title="添加商品信息" :visible.sync="personalInfoDialog1" width="30%"  center>

          <el-form ref="u"  label-width="80px">
                <el-form-item label="商品名称">
                    <el-input type="text" v-model="ProductInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="所属分类">
                    <el-input type="text" v-model="ProductInfo.secondName" ></el-input>
                </el-form-item>
                 <el-form-item label="录入数量">
                    <el-input type="text" v-model="ProductInfo.number"></el-input>
                </el-form-item>
                <el-form-item label="单品价格">
                    <el-input type="text" v-model="ProductInfo.price"></el-input>
                </el-form-item>
                <el-form-item label="商品状态">
                    <el-input type="text" v-model="ProductInfo.statusName"></el-input>
                </el-form-item>
              <el-row :gutter="20">
                  <el-col :span="5" :offset="5">
                      <el-form-item >
                          <el-button type="success" @click="InsertSecondInfo" >提交</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {

  methods: {
    //删除的方法
      deleteProductAttr(index,records){
            this.$http.post("http://127.0.0.1:8888/productAttr/deleteproductAttr",{
            id:records[index].id,
         }).then(
          data=>{
             console.log(data);
             location.reload();
           }
        );
      },
    //修改的方法
      getProductAttr(index,records){
        this.personalInfoDialog2=true;
        console.log(records[index].id);
        this.ProductInfo.id=records[index].id;

      },
      changeProductAttr(){
         this.$http.post("http://127.0.0.1:8888/productAttr/updataproductAttr",{
            id:this.ProductInfo.id,
            name:this.ProductInfo.name,
            secondName:this.ProductInfo.secondName,
            number:this.ProductInfo.number,
            price:this.ProductInfo.price,
            status:this.ProductInfo.status,
            statusName:this.ProductInfo.statusName
         }).then(
          data=>{
             console.log(data);
             this.personalInfoDialog2=false;
             location.reload();
           }
        );
      },
    //模糊查询
      likecheck(){
        this.$http.get("http://127.0.0.1:8888/productAttr/likeproductAttr",
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
                this.showProdutAttrInfo();
              }

            });
      },
    //分页展示的方法
      handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pages.sizePage=this.pages.sizePage;
            this.pages.current=val;
            this.showProdutAttrInfo();
        },
    //分页查询请求的方法
    showProdutAttrInfo(){
        this.$http.get("http://127.0.0.1:8888/productAttr/queryproductAttr",
          {
            params:{
                 current:this.pages.current,
                 sizePage:this.pages.sizePage
            }
        }).then(data=>{
          console.log(data);
          this.pages.total=data.data.data.total;
          this.records=data.data.data.records

        });
      },
       //新增商品的方法
      InsertSecondInfo(){
        this.$http.post("http://127.0.0.1:8888/productAttr/insertproductAttr",{
          id:this.ProductInfo.id,
          name:this.ProductInfo.name,
          secondName:this.ProductInfo.secondName,
          number:this.ProductInfo.number,
          price:this.ProductInfo.price,
          status:this.ProductInfo.status,
          statusName:this.ProductInfo.statusName,
          userName:JSON.parse(localStorage.getItem("user")).username
        }).then(
          data=>{
             this.personalInfoDialog1=false
             location.reload()
             console.log(data)
             if(data.data.code==20001){
               alert(data.data.message)
             }

           }
        );
      }
  },
  //钩子函数
    created(){
      this.showProdutAttrInfo();
    },
    //监听的方法
        watch:{
            //监听check对象
          likeCheck:{
            handler(){
              if(this.likeCheck.name==""){
                  this.showProdutAttrInfo();
              }

          },
            deep:true
          }
        },

  data() {
    return {
         //新增的对象
         ProductInfo:{
            id:"",
            name:"",
            secondName:"",
            number:"",
            price:"",
            status:"",
            statusName:""
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
          id:'',
          name: '',
          secondName:'',
          number:"",
          price:"",
          status:"",
          statusName:""
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
