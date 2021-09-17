<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
    <el-breadcrumb-item>批量上传坐标</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="boxCard">
    <h3>输入坐标信息</h3>
    <el-table class="table-group" :data="locations" highlight-current-row>
      <el-table-column type="selection" width="60px"></el-table-column>
      <el-table-column type="index" label="序号" width="100" ></el-table-column>
      <el-table-column label="纬度(Lat)" width="300" property="lat" >
        <template slot-scope="scope">
          <el-input ref="editInput" v-model="scope.row.lat" placeholder="请输入纬度坐标"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="经度(Lng)" width="300" property="lng" >
        <template slot-scope="scope">
          <el-input ref="editInput" v-model="scope.row.lng" placeholder="请输入经度坐标"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" property="lng" >
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="rowDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>确认删除该坐标</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="handleDeleteClose" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <el-button class="buttonGroup" type="primary" @click="addNewRow" size="mini">添加</el-button>
    <el-button class="buttonGroup" type="danger" @click="deleteAll" size="mini">删除选中项</el-button>
    <el-button class="buttonGroup" type="success" @click="upload" size="mini">提交</el-button>
  </el-card>
  <el-card>

  </el-card>
</div>
</template>

<script>
export default {
  name: "locationTable",
  data(){
    return{
      locations:[
        {
          lat:'12',
        lng:'123'},
      ],
      // 弹出提示框
      dialogVisible:false,
      deleteIndex:''
    }
  },
  methods:{
    rowDelete(menu){
      console.log("rowdelete")
      this.dialogVisible=!this.dialogVisible
      this.deleteIndex = this.locations.indexOf(menu)
    },
    addNewRow(){
      let lastIndex = this.locations.length-1
      console.log(lastIndex)
      if(this.locations[lastIndex].lat!==''||this.locations[lastIndex].lng!==''){
        this.locations.push({lat:'',lng:''})
      }else {
        this.$message.info("坐标数据不能为空")
      }
    },
    consoleInfo(){
      console.log("this info is ok")
    },
    deleteAll(){
      console.log("delete")
    },
    async upload() {
      console.log("upload")
      console.log(this.locations)
      const {data: res} = await this.$http.post('compute/depotData', this.locations)
      console.log(res)
      if (res.status === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    currentChange(){
      console.log("currentChange")
    },
    handleDeleteClose(){
      console.log("close")
      this.dialogVisible=!this.dialogVisible
      this.locations.splice(this.deleteIndex,1)
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.boxCard{
  margin: 10px;
}
.buttonGroup{
  margin-top: 10px;
}
</style>
