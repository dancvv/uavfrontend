<template>
<div>
  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-tabs id="card-box" v-model="activeTab" type="border-card" v-show="showCard">
    <el-tab-pane label="任务设置" name="missionManage">
      <el-button type="primary" class="mapgroup" size="mini" @click="placePoint">{{poly.edit?'停止绘制':'开始绘制'}}</el-button>
      <el-button type="primary" class="mapgroup" size="mini" >地理围栏</el-button>
      <el-button type="primary" class="mapgroup" size="mini" @click="updateMarker">Test</el-button>
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
    <span>序号：</span><el-input size="mini" v-model="markerEdit.number">{{markerEdit.number}}</el-input><br>
    <span>用户：</span><el-input size="mini" v-model="markerEdit.number">{{markerEdit.mobileid}}</el-input><br>
    <span>经度(lat)：</span><el-input v-model="markerEdit.lat" size="mini" width="40px">{{markerEdit.lat}}</el-input><br>
    <span>纬度(lng)：</span><el-input v-model="markerEdit.lng" size="mini" width="40px">{{markerEdit.lng}}</el-input><br>
    <el-button class="el-button" @click="cardVisible = false" size="mini">取 消</el-button>
    <el-button class="el-button" type="primary" @click="editConfirm(markerEdit)" size="mini">确 定</el-button>
  </el-card>
</div>
</template>

<script>
import {mapMutations,mapState} from "vuex";
import L from "leaflet"
import qs from "qs";
import "leaflet-polylinedecorator"
let markers=[]
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
        edit:false
      },
      // 用户的标识符
      titleString:[],
      // 是否展示编辑界面
      cardVisible:false,
      markerEdit:{
        number:'',
        mobileid:'',
        lat:'',
        lng:''
      },

      // markerSet:new L.layerGroup()
      layerSet:{
        markerSet:'',
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
    //  路线结果数组
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
//  进入立马开始划线
    this.updateLine()
    this.updateMarker()
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
      let depotIcon=new LeafIcon({iconUrl: '/leaflet/mobile.png'})
      that.poly.edit=!that.poly.edit
      const mapClickLocation = new Map()
      const mapLeaf=that.leafletMap
      // 添加至layer group,实现群体控制
      that.layerSet.markerSet = L.layerGroup().addTo(mapLeaf)
      mapLeaf.on('click',(e)=>{
        if (!that.poly.edit){
          return
        }
      // 按照顺序加入各个点
        that.poly.paths.push(e.latlng)
        that.titleString[markers.length]='user'+(markers.length)
        console.log(that.titleString[markers.length])
        mapClickLocation.set(that.titleString[markers.length],e.latlng)
        //根据点击位置放置一个图标
        markers[markers.length]=L.marker((e.latlng),{icon:depotIcon,title:that.titleString[markers.length]}).addTo(that.layerSet.markerSet)
        let markerLength = markers.length - 1;
        // 单击图标实现弹框编辑
        markers[markerLength].on('click',(e)=>{
          // 记录当前点击的序号，存入vuex
          that.recordLocate(markerLength)
          that.cardVisible=!that.cardVisible
          that.markerEdit.number=markerLength
          console.log(that.titleString[markers.length])
          that.markerEdit.mobileid=that.titleString[markers.length]
          that.markerEdit.lat=e.latlng.lat
          that.markerEdit.lng=e.latlng.lng
        })
      });
      console.log(that.poly.paths)
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
      const {data: res} = await this.$http.post('compute/uploadData', this.poly.paths)
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
      // 清除图标
      if(this.layerSet.markerSet===''){
        this.$message.success('并未放置坐标点')
      }else {
        this.layerSet.markerSet.clearLayers()
        this.$message.success('重置成功')
      }

      // 清除前端和后端数据状态
      this.poly.paths=[]
      // 清除图标
      markers=[]
      // 把原始数组存入一个空值，放置后期反复添加
      this.storeOriginLine([])
      // 将vuex中gps经纬度数据清零,保证其他界面数据状态也为空
      this.changeLocations('')
      this.storeLineResults('')
      this.uavRoutesMapSetting('')

      // 清除路线
      if (this.layerSet.lineSet!==''){
        this.layerSet.lineSet.clearLayers()
        console.log(this.leafletLine.decoratorLine)
        this.storeDecoratorLine('')
      }

      const {data: res} = await this.$http.get('compute/delete')
      console.log(res)
      if (res.status !== 200) {
        this.$message.error("网络连接超时")
        return
      }
      console.log(res.msg)
      this.$message.success(res.msg)
      if(this.pathLine.originLine!==null){
        this.multiLine=[]
        this.pathLine.originLine.remove()
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
      console.log(this.layerSet.markerSet)
      if(this.layerSet.markerSet===null){
        this.$message.success('并未放置坐标点')
      }else {
        this.layerSet.markerSet.clearLayers()
        this.$message.success('重置成功')
      }
      console.log("reset:"+this.markersLocate)
    },
    //进行计算并给出规划结果
    async planSolution() {
      // 清空绘制库
      // this.multiLine=[]
      // this.polyline.remove()
      // 规划前确保数据为空
      this.planningLine.planningRoute={}
      // 查询后端数据库
      const {data:resList} = await this.$http.get('compute/list')
      let id=[]
      console.log(resList)
      for(let item in resList.data){
        id.push(resList.data[item].id)
      }
      //得到结果前，先清除所有结果
      this.planningLine.paths=[]
      const {vehicleNumber,depot}=this.vehiclePlan
      const {data: res} = await this.$http.post('compute/plan',
          qs.stringify(
              {
                vehicleNumber:vehicleNumber,
                depot:depot-1},))
      // this.depot.positions = res
      let objectiveValue=res.info.routeDistance.shift()
      let routeDistance=res.info.routeDistance
      let planValue={objectiveValue,routeDistance}
      // 存入vuex
      this.storeObjectiveValue(planValue)
      // 删除
      delete res.info.routeDistance
      // 将无人机路线任务存入vuex，里面存储的是纯数字
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
      console.log(mapLocation)
      // 存入vuex状态管理
      this.uavRoutesMapSetting(mapLocation)
      this.planningLine.planningRoute=mapLocation
    //  展示规划路线
    },
    drawLine() {
      // 已经有规划结果，无论如何都不会调用
      console.log("palnm")
      console.log(this.multiLine.length)
      if (this.multiLine.length!==0){
        this.$message.error("不会调用")
        return;
      }
      const mapLeaf = this.leafletMap
      //  获取原始路线图
      this.planningLine.planningRoute = this.uavPlanningRoutes.routeMapLocation
      // 如果原来不存在规划结果，画线函数就生效
      if (this.planningLine.planningRoute.size === undefined) {
        return
      }
      console.log("the planning route")
      console.log(this.planningLine.planningRoute)
      // 将Map数据转换为array数组
      for (let i = 0; i < this.planningLine.planningRoute.size; i++) {
        this.multiLine.push(this.planningLine.planningRoute.get(i))
      }
      console.log(this.multiLine)
      // 纯数组数据存入vuex，方便后期调用
      this.storeOriginLine(this.multiLine)
      this.layerSet.lineSet = L.layerGroup().addTo(mapLeaf)
      let colorSet = ['#00bd01','#008080','#BDB76B','#DAA520','#FF7F50','#BC8F8F','#48D1CC','#87CEFA','#9400D3']
      // 把路线存入vuex，从vuex取得唯一地图函数
      for (let i=0;i<this.multiLine.length;i++){
        this.pathLine.originLine[i]=L.polyline(this.multiLine[i], {weight: 8, color: colorSet[i]}).addTo(this.layerSet.lineSet)
        mapLeaf.fitBounds(this.pathLine.originLine[i].getBounds())
        L.polylineDecorator(this.pathLine.originLine[i], {
          patterns: [
            {offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({
                pixelSize: 5,
                headAngle: 75,
                polygon: false,
                pathOptions: {
                  stroke: true,
                  weight: 2,
                  color: '#ffffff'
                }
              })}
          ]
        }).addTo(this.layerSet.lineSet)
      }
    },
    updateMarker(){
      if (this.depotLocations.length !==0 && markers.length===0){
        const mapLeaf = this.leafletMap
        let depotIcon=new LeafIcon({iconUrl: '/leaflet/mobile.png'})
        this.layerSet.markerSet = L.layerGroup().addTo(mapLeaf)
        for (let i = 0;i<this.depotLocations.length; i++){
          let titleString='用户'+(markers.length)
          markers[i]=L.marker((this.depotLocations[i]),{icon:depotIcon,title:titleString,zIndexOffset:0}).addTo(this.layerSet.markerSet)
        }
      } else{
        return
      }
    },
    updateLine(){
      const mapLeaf = this.leafletMap
      let decorateLine = this.uavPlanningRoutes.originLine
      console.log("更新路线")
      console.log(decorateLine)
      if (decorateLine.length === 0 ){
        return
      }
      console.log("路线完成")
      this.layerSet.lineSet = L.layerGroup().addTo(mapLeaf)
      // 把路线存入vuex，从vuex取得唯一地图函数
      let colorSet = ['#00bd01','#008080','#BDB76B','#DAA520','#FF7F50','#BC8F8F','#48D1CC','#87CEFA','#9400D3']
      for (let i=0;i<decorateLine.length;i++){

        this.pathLine.originLine[i]=L.polyline(decorateLine[i], {weight: 8, color: colorSet[i]}).addTo(this.layerSet.lineSet)
        mapLeaf.fitBounds(this.pathLine.originLine[i].getBounds())
        L.polylineDecorator(this.pathLine.originLine[i], {
          patterns: [
            {offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({
                pixelSize: 5,
                headAngle: 75,
                polygon: false,
                pathOptions: {
                  stroke: true,
                  weight: 2,
                  color: '#ffffff'
                }
              })}
          ]
        }).addTo(this.layerSet.lineSet)
      }
    }
  },
  computed:{
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
#card-box{
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
</style>
