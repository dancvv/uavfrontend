<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>任务执行</el-breadcrumb-item>
    <el-breadcrumb-item>当前路线</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="card-box">
    <h3>无人机当前优化路线</h3>
    <el-divider></el-divider>
    <div style="width:100px; height:100px" id="statistic"></div>
    <div id="objBox" v-show="uavRoutes.length!==0">
      <h4 style="font-size: 20px">无人机的优化数值</h4>
      <p>路线未优化前总长度: {{objValue/100}} m</p>
      <p v-for="(route,index) in routeValue" :key="index">无人机 {{index+1}} 的路线长度： {{route/10}} m</p>
    </div>
    <h4 style="font-family: 'Microsoft YaHei UI '; color: red; display: block; align-content: center;" v-if="printAllValues.length===0">没有无人机执行任务或者没有规划路线</h4>
    <div class="table-box" id="routeBox" v-for="(item,i) in printAllValues" :key="item.id">
      <h4 style="margin-top: 30px">无人机 {{i+1}} 的任务执行顺序</h4>
      <h5 style="font-family: 'Microsoft YaHei UI'; color: red" v-if="item.length<=2">当前无人机不执行任务</h5>
      <el-table class="table-box"  :data="item" max-height="650" style="width:700px" :highlight-current-row="true">
        <el-table-column type="index" label="顺序" width="50"></el-table-column>
        <el-table-column prop="mobileid" label="用户站点" width="100"></el-table-column>
        <el-table-column prop="location[0]" label="经度(Lat)" width="200"></el-table-column>
        <el-table-column prop="location[1]" label="纬度(Lng)" width="200"></el-table-column>
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
      printAllValues:[],
      uavRoutes:'',
      uavOptimal:'',
      serial:0,
      objectiveValue:'',
      routeDistance:''
    }
  },
  computed:{
    ...mapState(['uavRouteInfo','uavPlanningRoutes','planValue']),
    routeValue(){
      return this.uavOptimal.slice(1)
    },
    objValue(){
      // console.log(this.uavRouteInfo.length)
      if(this.uavRouteInfo.length!==null){
        return this.uavOptimal[0]
      }else{
        return null;
      }
    }

  },
  methods:{
    init(){
      // 初始化赋值
      this.uavRoutes = Object.values(this.uavRouteInfo)
      // 判断值不大于某一临界值
      if (this.uavRoutes.length!==0){
        this.uavOptimal = this.uavRoutes[this.uavRoutes.length-1]
      }
      for (let i=0;i<this.uavRoutes.length-1;i++){
        this.printAllValues[i]=this.uavRoutes[i]
      }
      console.log(this.printAllValues)
    },
    statisticEchart(){
      let statisticChart = this.$ech
    }
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
  /*margin-left: 10%;*/
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#objBox{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*margin-left: 30%;*/
}
</style>
