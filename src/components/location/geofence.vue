<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
      <el-breadcrumb-item>地理围栏</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="boxCard">
      <h3>地理围栏坐标</h3>
      <el-table class="table-group" :data="geoFenceData.points" highlight-current-row>
        <el-table-column type="selection" width="100px" ></el-table-column>
        <el-table-column type="index" label="序号" width="100" ></el-table-column>
        <el-table-column label="纬度(Lat)" width="200" property="lat" >
          <template slot-scope="scope">
            <el-input ref="editInput" v-model="scope.row.lat" placeholder="请输入纬度坐标"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="经度(Lng)" width="200" property="lng" >
          <template slot-scope="scope">
            <el-input ref="editInput" v-model="scope.row.lng" placeholder="请输入经度坐标"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" property="lng">
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
      <el-button class="buttonGroup" type="primary" @click="addFenceRow" size="mini">添加</el-button>
      <el-button class="buttonGroup" type="danger" @click="deleteAll" size="mini">删除选中项</el-button>
    </el-card>
    <div id="resultSetting">
      <el-button type="primary" @click="dialogResetVisible=true" size="mini">重置</el-button>
      <el-button type="success" @click="upload" size="mini">提交</el-button>
      <el-dialog
          title="提示"
          :visible.sync="dialogResetVisible"
          width="30%">
        <span>是否重置所有输入</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogResetVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="resetTable" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "geofence",
  data(){
    return{
      geoFenceData:{
        points:[{lat:'',lng:''}],
        fenceType:''
      },
      dialogResetVisible:false,
    }
  },
  methods:{
    addFenceRow(){
      let lastIndex = this.locations.length-1
      console.log(lastIndex)
      if(this.geoFenceData.points[lastIndex].lat!==''&& this.geoFenceData.points[lastIndex].lng!==''){
        this.geoFenceData.points.push({lat:'',lng:''})
      }else {
        this.$message.info("坐标数据不能为空")
      }
    }

  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.boxCard{
  margin-top: 30px;
  margin-left: 80px;
  margin-right: 80px;
}
.geoFenceForm{
  width: 200px;
}
#resultSetting{
  margin-top: 20px;
  margin-right: 80px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;

}
</style>
