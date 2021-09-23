<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>任务执行</el-breadcrumb-item>
    <el-breadcrumb-item>当前路线</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="card-box">
    <h3>无人机当前路线</h3>
    <el-divider></el-divider>
    <div id="objBox" v-show="mapRoute.length!==0">
      <h4>无人机的优化数值</h4>
      <p>总长度 {{objValue/10}} m</p>
      <p v-for="(route,index) in routeValue" :key="index">无人机 {{index+1}} 的路线长度： {{route/10}} m</p>
    </div>
    <h4 style="font-family: 'Microsoft YaHei UI '; color: red; display: block; align-content: center;" v-if="mapRoute.length===0">没有无人机执行任务或者没有规划路线</h4>
    <div class="table-box" id="routeBox" v-for="(item,i) in mapRoute" :key="item.id">
      <h4 style="margin-top: 30px">无人机 {{i+1}} 的任务执行顺序</h4>
      <h5 style="font-family: 'Microsoft YaHei UI'; color: red" v-if="item.length<=2">当前无人机不执行任务</h5>
      <el-table  :data="item" max-height="650" style="width:700px" :highlight-current-row="true">
        <el-table-column type="index" label="顺序" width="50"></el-table-column>
        <el-table-column prop="sequence" label="站点" width="50"></el-table-column>
        <el-table-column prop="id" label="站点(数据库名)" width="200"></el-table-column>
        <el-table-column prop="lat" label="经度(Lat)" width="200"></el-table-column>
        <el-table-column prop="lng" label="纬度(Lng)" width="200"></el-table-column>
      </el-table>
    </div>
  </el-card>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "currentRoute",
  data() {
    return {
      mapRoute:'',
      serial:0,
      objectiveValue:'',
      routeDistance:''
    }
  },
  computed:{
    ...mapState(['uavPlanningRoutes','planValue']),
    routeValue(){
      return this.planValue.routeDistance
    },
    objValue(){
      return this.planValue.objectiveValue
    }

  },
  methods:{
    init(){
      let routes = this.uavPlanningRoutes.routeMapLocation
      let serial = this.uavPlanningRoutes.drawMultiLine
      let mapList = []
      for(let i=0;i<routes.size;i++){
        let routeLine=routes.get(i)
        let serialNum = serial[i]
        for (let innerSeq=0;innerSeq<routeLine.length;innerSeq++){
          routeLine[innerSeq]["sequence"]= serialNum[innerSeq]+1
        }
        mapList.push(routeLine)
      }
      console.log("获得完整数据")
      console.log(mapList)
      this.mapRoute=mapList
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.card-box{
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
.routeBox{
  align-content: center;
}
.table-box{
  /*position: absolute;*/
  /*align-content: center;*/
  margin-left: 10%;
}
#objBox{
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  margin-left: 30%;
}
</style>
