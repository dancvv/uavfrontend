<template>
<div>
  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-tabs class="card-box" v-model="activeTab" type="border-card" v-show="showCard">
    <el-tab-pane label="任务设置" name="missionManage">
      <el-button type="primary" class="mapgroup" size="mini" @click="placePoint">{{poly.useredit?'停止绘制':'开始绘制'}}</el-button>
      <el-button type="success" @click="placeDepot" size="mini">{{!poly.depotedit?'放置无人机仓库位置':'放置完成'}}</el-button><br>
      <el-button type="primary" size="mini" @click="resetMarker">重置</el-button>
      <el-button type="primary" size="mini" @click="uploadData">上传数据</el-button>
      <el-button type="primary" class="mapgroup" size="mini" >地理围栏</el-button>
      <el-button type="primary" class="mapgroup" size="mini" @click="updateMarker">Test</el-button>
      <div class="editBox" v-show="poly.useredit">
        <span>无人机数：</span><el-input class="inputSetting" label="无人机数量" placeholder="至少1台无人机" v-model="vehiclesSetting.vehicleNumber" size="mini"></el-input><br>
        <el-button type="primary" size="mini" @click="resetMarker">重置</el-button>
        <el-button type="primary" size="mini" @click="uploadData">上传数据</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="路线规划" name="uncertain">
      <el-button type="primary" class="mapgroup" size="mini" @click="planSolution">任务规划</el-button>
      <el-button type="primary" class="mapgroup" size="mini" @click="drawLine">绘制路线</el-button>
      <el-button type="primary" class="mapgroup" size="mini" @click="clearBackend">清除所有数据</el-button>
    </el-tab-pane>
  </el-tabs>
  <el-card class="card-box" v-show="cardVisible">
    <h3 style="margin-top: 0px">当前用户参数</h3>
    <el-form size="mini">
      <el-form-item label="序号">{{markerEdit.number}}</el-form-item>
      <el-form-item label="用户">{{markerEdit.mobileid}}</el-form-item>
      <el-form-item label="创建时间">{{markerEdit.createTime}}</el-form-item>
      <el-form-item label="经度(Lat)">
        <el-col :span="16">
          <el-input v-model="markerEdit.lat">{{markerEdit.lat}}</el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="纬度(Lng)">
        <el-col :span="16">
          <el-input v-model="markerEdit.lng">{{markerEdit.lng}}</el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button class="el-button" @click="cardVisible = false" size="mini">取 消</el-button>
    <el-button class="el-button" type="primary" @click="editConfirm(markerEdit)" size="mini">确 定</el-button>
  </el-card>
</div>
</template>

<script>
import {mapMutations,mapState} from "vuex";
import L from "leaflet"
import "leaflet-polylinedecorator"
let markers=[]
let mapLeaf = null
let depotMarker = null
let LeafIcon = L.Icon.extend({
  options: {
    iconSize:     [36, 36],
    shadowSize:   [0, 0],
    iconAnchor:   [18, 30],
  }
});
export default {
  name: "mapComponent",
  data(){
    return{
      // map:''
      center: [ 39.082324815761126,121.81149363525782],
      //展示卡片
      showCard:true,
    //  开始编辑地图
      poly:{
        paths:[],
        useredit:false,
        depotedit:false
      },
      // 用户信息和用户位置信息
      uploadinfo:{
        userinfo:[],
        locationinfo:[]
      },
      // 用户的标识符
      titleString:[],
      // 是否展示编辑界面
      cardVisible:false,
      markerEdit:{
        number:'',
        mobileid:'',
        createTime:'',
        lat:'',
        lng:''
      },
      // 上传数据专用

      // markerSet:new L.layerGroup()
      layerSet:{
        markerSet:'',
        depotSet:'',
        lineSet:'',
      },
      // 图标长度
      markerLength:'',
      reset:false,
      // 无人机任务参数设置
      vehiclesSetting:{
        vehicleNumber:1,
        depot:1
      },
    //  规划路线
      planningLine:{
        editing:false,
        paths:[],
        planningRoute:{}
      },
    //  激活的选项卡名
      activeTab:'missionManage',
      multiLine:[],
      pathLine: {
    //  原始路线
        originLine:[],
    //  装饰路线，绿色
        decoratorLine:null,
        controlLayer:''
      },
    }
  },
  created() {
    // 全局删除状态
    // this.clearBackend()
  },
  mounted() {
    this.initVariable()

    // this.drawLine()
  },
  updated() {

  },
  beforeDestroy(){
    // 销毁组件时自动清空markers
    markers=[]
  },
  methods:{
    ...mapMutations(['initmarker','recordLocate','changeLocations','changeVehicles','storeLineResults','uavRoutesMapSetting','storeObjectiveValue','storeDecoratorLine','storeOriginLine']),
    initVariable(){
      // 无人机任务参数设置 从vuex获取状态
      this.vehiclesSetting=this.vehiclePlan
      markers = []
      // 初始化地图
      mapLeaf=this.leafletMap
      // 添加至layergroup,实现群体控制
      // this.layerSet.markerSet = L.layerGroup().addTo(mapLeaf)

    },
    showEdit(){
      this.showCard=!this.showCard
    },
    placePoint(){
      // 存在初始化后值加1
      // markers = []
      let that = this
      mapLeaf=that.leafletMap
      // 添加至layer group,实现群体控制
      that.layerSet.markerSet = L.layerGroup().addTo(mapLeaf)
      let uavIcon=new LeafIcon({iconUrl: '/leaflet/mobile.png'})
      that.poly.useredit=!that.poly.useredit
      mapLeaf.on('click',(e)=>{
        if (!that.poly.useredit){
          return
        }
      // 按照顺序加入各个点
        that.titleString[markers.length]="user "+(markers.length)
        let userid="user "+markers.length
        console.log(e)
        let createStamp = new Date()
        this.inputUserLocation(userid,createStamp,e)
        //根据点击位置放置一个图标
        markers[markers.length]=L.marker((e.latlng),{icon:uavIcon,title:that.titleString[markers.length]}).addTo(that.layerSet.markerSet)
        let markerLength = markers.length - 1;
        // 单击图标实现弹框编辑
        markers[markerLength].on('click',(e)=>{
          // 记录当前点击的序号，存入vuex
          that.recordLocate(markerLength)
          that.cardVisible=!that.cardVisible
          that.markerEdit.number=markerLength
          that.markerEdit.mobileid=userid
          that.markerEdit.createTime=createStamp
          that.markerEdit.lat=e.latlng.lat
          that.markerEdit.lng=e.latlng.lng
        })
      });
      // console.log(that.poly.paths)
    },
    placeDepot(){
      let that = this
      that.poly.depotedit = !that.poly.depotedit
      if (depotMarker!==null){
        console.log(depotMarker)
        that.poly.depotedit = !that.poly.depotedit
        return
      }
      mapLeaf=this.leafletMap
      let depotIcon = new LeafIcon({iconUrl:'/leaflet/depot.svg'})
      that.layerSet.depotSet = L.layerGroup().addTo(mapLeaf)
      mapLeaf.on('click',(e)=>{
        console.log("__________")
        if(!that.poly.depotedit){
          return
        }
        let userid = "depot 0"
        let createStamp = new Date()
        this.inputUserLocation(userid,createStamp,e)
        depotMarker = L.marker((e.latlng),{icon:depotIcon,title:"仓储位置"}).addTo(that.layerSet.markerSet)
        console.log("==========")
        if(depotMarker!==null){
          that.poly.depotedit = false
          console.log(that.poly.depotedit)
          this.$message.success("放置完成")
        }
        depotMarker.on('click',(e)=>{
          console.log("this uav")
          console.log(e)
        })
      })
    },
    inputUserLocation(userid,createStamp,e){
      let that =this
      let userString = {}
      let locationString = {
        userid:'',
        serviceTime:'',
        status:'',
        geoPoint:{
          type:'',
          coordinates:[]
        }
      }
      userString.mobileId=userid
      userString.serviceStatus=false
      userString.createTime=createStamp
      // 上传用户信息
      that.uploadinfo.userinfo.push(userString)
      locationString.userid=userid
      locationString.serviceTime=createStamp
      locationString.status=false
      locationString.geoPoint.coordinates[0]=e.latlng.lat
      locationString.geoPoint.coordinates[1]=e.latlng.lng
      locationString.geoPoint.type="Point"
      // 上传位置信息
      that.uploadinfo.locationinfo.push(locationString)
    },
    updateMarker(){},
    resetMarker(){
      markers=[]
      depotMarker=null
      this.layerSet.markerSet.clearLayers()
      this.layerSet.depotSet.clearLayers()
    },
    //上传数据到数据库
    async uploadData() {
      // 上传前先删掉本地结果
      if (this.vehiclesSetting.vehicleNumber===''){
        return this.$message.warning("必须输入无人机任务参数")
      }
      // 改变状态，上传完成完成前改变卡片显示状态
      console.log("jklfds")
      // this.poly.useredit=!this.poly.useredit
      // 存储各个设备的GPS经纬度数据
      this.changeLocations(this.poly.paths)
      // 参数存储至全局状态 vuex
      this.changeVehicles(this.vehiclesSetting)
      // const {data: res} = await this.$http.post('compute/uploadData', this.poly.paths)
      // console.log(this.uploadinfo.userinfo)
      const {data: resuser} = await this.$http.post('mobile/savemany', this.uploadinfo.userinfo)
      const {data: reslocate} = await this.$http.post('mobile/manylocations',this.uploadinfo.locationinfo)
      console.log(resuser)
      console.log(reslocate)

      // console.log(reslocate)
      // if (resuser.status === 200) {
      //   this.$message.success(resuser.msg)
      // } else {
      //   this.$message.error(resuser.msg)
      //   this.$message.error(reslocate.msg)
      // }

      // 改变编辑状态和取消显示卡片
      // this.showCard=!this.showCard
    },
    planSolution(){},
    drawLine(){},
    clearBackend(){},
    editConfirm(){}
  },
  computed:{
    // initmapVariable() {
    //   mapLeaf=this.leafletMap
    //   return mapLeaf
    // },
    ...mapState(['leafletMap','leafMarker','markersLocate','depotLocations','vehiclePlan','uavPlanningRoutes','leafletLine'])
  }
}
</script>

<style scoped>
#card-edit{
  position: absolute;
  margin-top: 60px;
  margin-left: 20px;
  /*width: 300px;*/
  z-index:1
}
.card-box{
  position: absolute;
  margin-top: 100px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 0px;
  margin-bottom: 10px;
}
.el-button{
  margin-top: 20px;
}
.inputSetting{
  margin-bottom: 10px;
  width: 60px;
}
.editBox{
  margin: 10px;
  display: block;
  flex-wrap: wrap;
  align-content: center;
}
.el-form-item{
  margin-bottom: 5px;
}
</style>
