<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
      <el-breadcrumb-item>地理围栏</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="boxCard">
      <h3>围栏类型</h3>
      <el-divider></el-divider>
      <el-select v-model="geoFenceData.value" placeholder="请选择围栏类型" :clearable="true" @change="changeFenceType">
        <el-option v-for="item in geoFenceData.fenceType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <h3>地理围栏坐标</h3>
      <el-divider></el-divider>
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
            <el-button type="danger" size="mini" @click="rowFenceDelete(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          title="提示"
          :visible.sync="dialogFenceVisible"
          width="30%">
        <span>确认删除该坐标</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFenceVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="handleDeleteFenceClose" size="mini">确 定</el-button>
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
        <span>是否重置所有地理围栏输入</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogResetVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="resetFenceTable" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {geoFenceEnum} from "../../common/enum/enumIndex"
export default {
  name: "geofence",
  data(){
    return{
      geoFenceData:{
        points:[{lat:'',lng:''}],
        fenceType:[
          {value:1 ,label:'EXCLUSION'},
          {value:0 ,label:'INCLUSION'}
        ],
        value:''
      },
      dialogResetVisible:false,
      dialogFenceVisible:false,
      // 删除的索引值
      deleteFenceIndex:'',
    }
  },
  methods:{
    ...mapMutations(['changeFenceParams']),
    addFenceRow(){
      let lastIndex = this.geoFenceData.points.length-1
      console.log(lastIndex)
      if(this.geoFenceData.points[lastIndex].lat!==''&& this.geoFenceData.points[lastIndex].lng!==''){
        this.geoFenceData.points.push({lat:'',lng:''})
      }else {
        this.$message.info("坐标数据不能为空")
      }
    },
    rowFenceDelete(menu){
      console.log("rowFenceDelete")
      this.dialogFenceVisible=!this.dialogFenceVisible
      this.deleteFenceIndex = this.geoFenceData.points.indexOf(menu)
      console.log(this.deleteFenceIndex)
    },
    handleDeleteFenceClose(){
      console.log("close")
      if(this.geoFenceData.points.length<=1){
        this.$message.error("必须输入至少一个坐标")
      }else{
        this.dialogFenceVisible=!this.dialogFenceVisible
        this.geoFenceData.points.splice(this.deleteFenceIndex,1)
      }
      console.log(this.geoFenceData.points)
    },
    resetFenceTable(){
      this.dialogResetVisible=!this.dialogResetVisible
      // 重置后端所有数据
      this.$http.get('compute/delete').then().catch(function (err) {
        console.log(err)
      })
      this.geoFenceData.points=[{lat:'',lng:''}]
    },
    deleteAll(){
    },
    upload(){
      console.log(geoFenceEnum)
      let lastIndex = this.geoFenceData.points.length-1
      if (this.geoFenceData.points[lastIndex].lat!==''&& this.geoFenceData.points[lastIndex].lng!==''){
        // 存入vuex，使得可以全局调用
        this.changeFenceParams(this.geoFenceData.points)
        console.log(this.fenceParam.points)
      }else {
        this.$message.error("地理围栏坐标输入不能为空")
      }
    },
    changeFenceType(){
      if (this.geoFenceData.value===1){
        console.log("get the EXCLUSION type and return it")
        console.log(geoFenceEnum.EXCLUSION)
      }else {
        console.log("get the INCLUSION type and return it")
        console.log(geoFenceEnum.INCLUSION)
      }
    }

  },
  computed:{
    ...mapState(['fenceParam'])
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.boxCard{
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
.buttonGroup{
  margin-top: 10px;
}
#resultSetting{
  margin-top: 20px;
  margin-right: 80px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;

}
</style>
