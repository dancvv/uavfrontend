<template>
<div>
  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-tabs id="card-box" v-model="activeTab" type="border-card" v-show="showCard">
    <el-tab-pane label="任务设置" name="missionManage">
      <el-button type="primary" class="mapgroup" size="mini" @click="placePoint">{{poly.edit?'停止绘制':'开始绘制'}}</el-button>
      <div class="editBox" v-show="poly.edit">
        <span>无人机数：</span><el-input class="inputSetting" label="无人机数量" placeholder="至少1台无人机" v-model="vehiclesSetting.vehicleNumber" size="mini"></el-input><br>
        <span>起始站点：</span><el-input class="inputSetting" label="仓库位置" placeholder="输入1以上的数字" v-model="vehiclesSetting.depot" size="mini"></el-input><br>
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
  <el-card id="card-box" v-show="cardVisible">
    <h3>当前设备设置</h3>
    设备编号：<el-input size="mini" v-model="markerEdit.number">{{markerEdit.number}}</el-input><br>
    经度(lat)：<el-input v-model="markerEdit.lat" size="mini" width="40px">{{markerEdit.lat}}</el-input><br>
    纬度(lng)：<el-input v-model="markerEdit.lng" size="mini" width="40px">{{markerEdit.lng}}</el-input><br>
    <el-button class="el-button" @click="cardVisible = false" size="mini">取 消</el-button>
    <el-button class="el-button" type="primary" @click="editConfirm(markerEdit)" size="mini">确 定</el-button>
  </el-card>
</div>
</template>

<script>
import {mapMutations,mapState} from "vuex";
import L from "leaflet"
import qs from "qs";
let markers=[]
let LeafIcon = L.Icon.extend({
  options: {
    iconSize:     [48, 48],
    shadowSize:   [0, 0],
    iconAnchor:   [24, 48],
    // popupAnchor:  [24, 48]
  }
});
export default {
  name: "mapComponent",
  data(){
    return{
      // map:''
      center: [ 39.082324815761126,121.81149363525782],
      //展示卡片
      showCard:false,
    //  开始编辑地图
      poly:{
        paths:[],
        edit:false
      },
      // 是否展示编辑界面
      cardVisible:false,
      markerEdit:{
        number:'',
        lat:'',
        lng:''
      },
      // markerSet:new L.layerGroup()
      markerSet:'',
      markerLength:'',
      reset:false,
      // 无人机任务参数设置
      vehiclesSetting:{
        vehicleNumber:'',
        depot:''
      },
    //  规划路线
      planningLine:{
        editing:false,
        paths:[],
        planningRoute:{}
      },
    //  激活的选项卡名
      activeTab:'missionManage',
    //  路线结果数组
      multiLine:[],
      polyline:'',
    }
  },
  created() {
    // 全局删除状态
    // this.clearBackend()
    this.initVariable()
  },
  mounted() {
  },
  methods:{
    ...mapMutations(['initmarker','markerChangeLocation','recordLocate','changeLocations','changeVehicles','uavRoutesMultiLineSetting','uavRoutesMapSetting']),
    initVariable(){
      this.vehiclesSetting=this.vehiclePlan
    },
    showEdit(){
      this.showCard=!this.showCard
    },
    placePoint(){
      let depotIcon=new LeafIcon({iconUrl: 'mobile.png'})
      this.poly.edit=!this.poly.edit
      const mapLeaf=this.leafletMap
      // 添加至layergroup,实现群体控制
      this.markerSet=new L.layerGroup().addTo(mapLeaf)
      mapLeaf.on('click',(e)=>{
        if (!this.poly.edit){
          return
        }
        this.poly.paths.push(e.latlng)
        // console.log(this.poly.paths)
        let titleString='用户'+(markers.length+1)
        //根据点击位置放置一个图标
        markers[markers.length]=L.marker((e.latlng),{icon:depotIcon,title:titleString}).addTo(this.markerSet)
        console.log("tubiao"+markers.length)
        // const mark=this.leafMarker
        let markerLength = markers.length - 1;
        markers[markerLength].on('click',(e)=>{
          // 记录当前点击的序号，存入vuex
          this.recordLocate(markerLength)
          this.cardVisible=!this.cardVisible
          this.markerEdit.number=markerLength+1
          this.markerEdit.lat=e.latlng.lat
          this.markerEdit.lng=e.latlng.lng
        })
      });

    },
    locationInput(){
      this.cardVisible=!this.cardVisible
    },
    //上传数据到数据库
    async uploadData() {
      // 上传前先删掉本地结果
      this.$http.get('compute/delete').then((e)=>{
        console.log(e)
      }).catch((err)=>{
        console.log(err)
      })
      if (this.vehiclesSetting.vehicleNumber===''||this.vehiclesSetting.depot===''){
        return this.$message.warning("必须输入无人机任务参数")
      }
      // 改变状态，上传完成完成前改变卡片显示状态
      this.poly.edit=!this.poly.edit
      // 存储各个设备的GPS经纬度数据
      this.changeLocations(this.poly.paths)
      // 参数存储至全局状态 vuex
      this.changeVehicles(this.vehiclesSetting)
      console.log(this.poly.paths)
      const {data: res} = await this.$http.post('compute/depotData', this.poly.paths)
      console.log(res)
      if (res.status === 200) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
      // 改变编辑状态和取消显示卡片

      // this.showCard=!this.showCard
    },
    //  清除后端所有数据
    async clearBackend() {
      // 清除前端和后端数据状态
      this.poly.paths=[]
      markers=[]
      // 将vuex中gps经纬度数据清零
      this.changeLocations('')
      if(this.markerSet===''){
        this.$message.success('并未放置坐标点')
      }else {
        this.markerSet.clearLayers()
        this.$message.success('重置成功')
      }
      // console.log(markers)
      // markers.remove()
      const {data: res} = await this.$http.get('compute/delete')
      console.log(res)
      if (res.status !== 200) {
        this.$message.error("网络连接超时")
        return
      }
      console.log(res.msg)
      this.$message.success(res.msg)
      console.log(this.polyline)
      if(this.polyline!==''){
        this.multiLine=[]
        this.polyline.remove()
      }
    },
    editConfirm(location) {
      let latlng = L.latLng(location)
      // 根据前面的点击数据找到marker，并对其设置值
      let locate = this.markersLocate
      markers[locate].setLatLng(latlng)
      //改变数组中的数值
      this.poly.paths[locate] = latlng
      console.log(this.poly.paths)
      //取消显示
      this.cardVisible = !this.cardVisible
      // marker.setLatLng()
      /*提交表单数据并进行设置*/
      this.markerEdit.number=''
      this.markerEdit.lat = ''
      this.markerEdit.lng = ''
    },
    resetMarker(){
      // 清除图标位置信息，图标信息，路径数组
      this.poly.paths=[]
      markers=[]
      this.multiLine=[]
      // this.reload()
      console.log(this.markerSet)
      if(this.markerSet===null){
        this.$message.success('并未放置坐标点')
      }else {
        this.markerSet.clearLayers()
        this.$message.success('重置成功')
      }
      console.log("reset:"+this.markersLocate)
    },
    //进行计算并给出规划结果
    async planSolution() {
      // 查询后端数据库
      const {data:resList} = await this.$http.get('compute/list')
      let id=[]
      console.log(resList.data[0].id)
      for(let item in resList.data){
        // console.log("dede: ")
        id.push(resList.data[item].id)
      }
      console.log(resList)
      //得到结果前，先清除所有结果
      this.planningLine.paths=[]
      const {vehicleNumber,depot}=this.vehiclePlan
      const {data: res} = await this.$http.post('compute/plan',
          qs.stringify(
              {
                vehicleNumber:vehicleNumber,
                depot:depot-1},))
      // this.depot.positions = res
      console.log(res)
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
          routeList.push(resData.location)
        }
        mapLocation.set(Number(key),routeList)
      }
      console.log(mapLocation)
      // 存入vuex状态管理
      this.uavRoutesMapSetting(mapLocation)
      this.planningLine.planningRoute=mapLocation
      console.log(this.planningLine.planningRoute)
    //  展示规划路线
    },
    drawLine(){
      const mapLeaf=this.leafletMap
      console.log("draw line")
      for(let i=0;i<this.planningLine.planningRoute.size;i++){
        this.multiLine.push(this.planningLine.planningRoute.get(i))
      }
      // 存入vuex状态管理
      this.uavRoutesMultiLineSetting(this.multiLine)
      console.log(this.multiLine)
      this.polyline=L.polyline(this.multiLine,{color:'green'}).addTo(mapLeaf)
      mapLeaf.fitBounds(this.polyline.getBounds())
    }
  },
  computed:{
    // add3(){
    //   console.log(this.$store.getters.getCount)
    //   return this.$store.getters.getCount
    // }
    ...mapState(['leafletMap','leafMarker','markersLocate','depotLocations','vehiclePlan'])
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
#card-box{
  position: absolute;
  margin-top: 100px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
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
</style>
