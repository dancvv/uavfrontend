<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
    <el-breadcrumb-item>批量修改坐标</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="boxCard">
    <h3>无人机任务参数设置</h3>
    <el-divider></el-divider>
    <el-form :model="vehicleSetting" :rules="rules" ref="settingRuleRef" size="small">
      <div id="missionSetting">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="无人机数量" prop="vehicleNumber">
              <el-input v-model="vehicleSetting.vehicleNumber" placeholder="执行任务的无人机数量" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务执行批次" prop="uuid">
              <el-input v-model="vehicleSetting.uuid" placeholder="任务执行的批次" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </el-card>
  <el-card class="boxCard">
    <h3>输入任务坐标信息</h3>
    <el-divider></el-divider>
    <el-table class="table-group" height="370px" :data="locations" highlight-current-row size="small">
      <el-table-column type="selection" width="50px" ></el-table-column>
      <el-table-column type="index" label="序号" width="60px" ></el-table-column>
      <el-table-column label="用户" width="100px" property="mobileid">
        <template v-slot=scope>
          <span>{{scope.row.mobileid}}</span>
        </template>
      </el-table-column>
      <el-table-column label="纬度(Lat)" width="200" property="lat" >
        <template v-slot=scope>
          <el-input ref="editInput" v-model="scope.row.lat" placeholder="请输入纬度坐标" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="经度(Lng)" width="200" property="lng" >
        <template v-slot=scope>
          <el-input ref="editInput" v-model="scope.row.lng" placeholder="请输入经度坐标" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" property="lng">
        <template v-slot=scope>
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
    <el-button class="buttonGroup" type="primary" @click="resetAll" size="mini">恢复</el-button>
  </el-card>
  <div id="resultSetting">
    <el-button type="primary" @click="dialogResetVisible=true" size="mini">重置</el-button>
    <el-button type="success" @click="modifyLocation" size="mini">确认修改</el-button>
    <el-button type="primary" @click="getPlanRoutes" size="mini">规划</el-button>
  </div>
  <div>
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
    <el-dialog
        title="提示"
        :visible.sync="showCardTab.confirmModify"
        width="30%">
      <span>确认修改坐标参数</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCardTab.confirmModify = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="confirmModify" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import qs from "qs";

export default {
  name: "locationTable",
  data(){
    return{
      // 提交数据验证
      uploadTrue:'',
      showCardTab:{
        confirmModify:false,
      },
      // 路线坐标数据
      locations:[
          {mobileid:'',lat:'',lng:''}
      ],
      // 弹出提示框
      dialogVisible:false,
      deleteIndex:'',
      // 重置表单数据
      dialogResetVisible:false,
    //  无人机参数设置
      vehicleSetting:{
        vehicleNumber:null,
        depot:null,
        uuid:null,
      },
      rules:{
        vehicleNumber:[
          {required:true,message:'请输入执行任务的无人机数量',trigger:'blur'},
        ],
      }
    }
  },
  computed:{
    ...mapState(['depotLocations','vehiclePlan']),
  },
  created() {
    this.initData()
  },
  methods:{
    ...mapMutations(['storeUavRouteInfo','changeLocations','changeVehicles','storeObjectiveValue','storeLineResults','uavRoutesMapSetting','storeOriginLine']),
    async initData() {
      this.vehicleSetting=this.vehiclePlan
      const {data: res} = await this.$http.get('compute/list')
      if(res.data.length===0){
        this.locations=[{mobileid:'',lat:'',lng:''}]
      }else {
        this.locations=res.data
        console.log(res)
      }
      this.$message.success(res.msg)

    },
    rowDelete(menu){
      console.log("rowdelete")
      this.dialogVisible=!this.dialogVisible
      this.deleteIndex = this.locations.indexOf(menu)
    },
    addNewRow(){
      console.log(this.depotLocations)
      let lastIndex = this.locations.length-1
      console.log(lastIndex)
      if(this.locations[lastIndex].lat!==''&&this.locations[lastIndex].lng!==''){
        this.locations.push({mobileid:'',lat:'',lng:''})
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
      await this.$refs.settingRuleRef.validate(async valid => {
        if (valid === true) {
          // 数据改变，将其存入vuex
          this.changeLocations(this.locations)
          // 无人机任务参数存入vuex
          this.changeVehicles(this.vehicleSetting)
          // 上传前先删除所有数据
          this.$http.get('compute/delete').then().catch(function (err) {
            console.log(err)
          })
          const {data: res} = await this.$http.post('compute/uploadData', this.locations)
          console.log(res)
          if (res.status === 200) {
            // 确认提交数据
            this.uploadTrue = 200
            this.$message.success(res.msg)
          } else {
            // 确认提交数据验证失败
            this.uploadTrue = 404
            this.$message.error(res.msg)
          }
        } else {
          this.$message.error("参数输入不能为空")
        }
      })
    },
    modifyLocation() {
      this.showCardTab.confirmModify=!this.showCardTab.confirmModify
    },
    async confirmModify() {
      this.showCardTab.confirmModify=!this.showCardTab.confirmModify
      const {data: resLocation} = await this.$http.post('compute/saveLocations', this.locations)
      this.$message.success(resLocation)
    },
    getPlanRoutes(){
      this.$refs.settingRuleRef.validate(async valid => {
        if (valid === true) {
          const {data:resPlan} =await this.$http.post('compute/findStaticRoutes',qs.stringify({vehicleNum:this.vehicleSetting.vehicleNumber}))
          if (resPlan.status!==200){
            this.$message.error(resPlan.msg)
          }else {
            console.log(resPlan.results)
            this.storeUavRouteInfo(resPlan.results)
            this.$message.success(resPlan.msg)
          }
        } else {
          this.$message.error("参数输入不能为空")
        }
      })
    },
    resetAll(){
      this.initData()
    },
    handleDeleteClose(){
      console.log("close")
      if(this.locations.length<=1){
        this.$message.error("必须输入至少一个坐标")
      }else{
        this.dialogVisible=!this.dialogVisible
        this.locations.splice(this.deleteIndex,1)
      }
    },
    resetTable(){
      this.dialogResetVisible=!this.dialogResetVisible
      // 重置后端所有数据
      this.$http.get('compute/deleteALL').then().catch(function (err) {
        console.log(err)
      })
      this.locations=[{lat:'',lng:''}]
      this.vehicleSetting={
        vehicleNumber:4,
        depot:0,}
    },
    async planSolution() {
      if(this.uploadTrue!==200){
        this.$message.warning("请先提交数据")
        return
      }
      const {data:resList} = await this.$http.get('compute/list')
      let id=[]
      console.log(resList)
      for(let item in resList.data){
        id.push(resList.data[item].id)
      }
      const {data: res} = await this.$http.post('compute/plan',
          qs.stringify(
              {
                vehicleNumber: this.vehicleSetting.vehicleNumber,
                depot: this.vehicleSetting.depot - 1
              },))
      console.log("get the plan solution")
      console.log(res)
      let objectiveValue=res.info.routeDistance.shift()
      let routeDistance=res.info.routeDistance
      let planValue={objectiveValue,routeDistance}
      // 存入vuex
      this.storeObjectiveValue(planValue)
      // 删除
      delete res.info.routeDistance
      // 将无人机路线任务存入vuex
      this.storeLineResults(res.info)
      if(res.status!==200){
        this.$message.error(res.msg)
        return
      }
      this.$message.success(res.msg)
      //  得到数据后，从后端取出相应的站点数据
      const {info:listLine} = res
      const mapRoute=new Map()
      const mapLocation=new Map()
      for(let line in listLine){
        // console.log(listLine[line])
        mapRoute.set(line,listLine[line])
      }
      for(const [key,value] of mapRoute){
        const routeList=[]
        for(let i=0;i<value.length;i++){
          // 后台计算默认从0开始，此时不需要加1
          let locationReal = id[value[i]]
          const {data:resData} = await this.$http.get('compute/getLocationByID',{params:{locationId:locationReal}})
          // 按顺序查询各个站点的坐标
          routeList.push(resData.location)
        }
        mapLocation.set(Number(key),routeList)
      }
      console.log("map数据"+mapLocation)
      // 将Map数据转换为array数组
      let multiLine=[]
      for (let i = 0; i < mapLocation.size; i++) {
        multiLine.push(mapLocation.get(i))
      }
      // 纯数组数据存入vuex，方便后期调用
      this.storeOriginLine(multiLine)
      // 存入vuex状态管理
      this.uavRoutesMapSetting(mapLocation)

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
  margin-left: 30px;
  margin-right: 30px;
}
.buttonGroup{
  margin-top: 10px;
}
.table-group{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#resultSetting{
  margin-top: 20px;
  margin-right: 80px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;

}
</style>
