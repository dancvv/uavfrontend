<template>
  <div id="mapsetting">
    <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group>
<!--    <map-component></map-component>-->
<!--    <editandplan></editandplan>-->
    <buttonpage :editFtButton="editFtButton" @drawLine="drawPathLine" @animateUAV="animateUAV" @planRoute="planRoute" @resetAllMarker="resetMarkers" @placeUser="addUserMarker" @placeDepot="addDepotMarker" @pushAll="uploadAll"></buttonpage>
    <!-- <mission-start :lineInfo="lineInfo" @animateMarkers="animateUAV"></mission-start> -->
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {mapMutations} from "vuex";
// import MissionStart from "@/page/multiuav/homemap/missionStart";
import buttonpage from "@/page/multiuav/homemap/buttonpage";
import UUID from "uuid-js"
import qs from "qs";
import "../../../assets/jsplugin/MovingMarker"
import "leaflet-polylinedecorator"
import 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.css'
let map=null
let layerGroup={
  userlayer:null,
  depotlayer:null,
  linelayer:null,
}
let layers = null
export default {
  name: "leaflet",
  components: { buttonpage },
  data(){
    return{
      // map:''
      // 地图类型
      mapId:'mapbox/streets-v11',
      editFtButton:{
        placeUserPoint:false,
        placeDepotPoint:false,
        uploadStatus:false,
        vehicleNumber:null,
        uuid:null,
      },
      layersSet:{
        markerSet:null,
      },
      lineInfo:{
        userLength:0,
        backendLine:[],
        pathline:[],
        // 存储路线的状态
        drawlineState:[],
        marker:[]
      },
      markers:{
        users:[],
        depot:null,
        uav:[]
      },
      // 用户信息和用户位置信息
      uploadinfo:{
        uuid:null,
        userinfo:[],
        locationinfo:[]
      },
      // 定位gps
      geoLocate:null,
    }
  },
  mounted() {
    this.mapInitialize();
    // this.geoLocate.start();
    // this.layersSet.markerSet=L.layerGroup().addTo(map)
  },
  created() {
    this.initMapUUID()
  },
  methods:{
    ...mapMutations(['initleaflet','storeUavRouteInfo']),
    mapInitialize(){
      map = this.$maputils.map.newMap("map",{
        minZoom: 1,
        maxZoom: 20,
        zoomControl: false,
        attributionControl: false,
        //坐标系选择
        crs: L.CRS.EPSG3857
      }).fitWorld()
      layers = this.$maputils.map.createLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      })
      L.control.zoom({position:'topright'}).addTo(map)
      L.control.attribution({
        position:'bottomright',
        prefix:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}).addTo(map)
        //  定位功能，可用
      this.geoLocate = L.control.locate({position:'bottomright',initialZoomLevel:15}).addTo(map);
      map.setView([39.08607290863458, 121.80813155137004], 16)
    },
    // 定位函数，显示定位成功与否
    locateYou(){
      map.on('locationfound',this.onLocationFound)
      map.on('locationerror',this.onLocationError)
      map.locate({setView:true,maxZoom:15})
    },
    onLocationFound(e){
      let radius=e.accuracy/2;
      let userMarker=L.marker(e.latlng).bindPopup('当前定位精度:'+radius+'m').openPopup()
      let userCircle=L.circle(e.latlng,radius)
      let locateGroup=L.layerGroup([userMarker,userCircle])
      locateGroup.addTo(map)
    },
    onLocationError(e){
      this.$message.error(e.message)
    },
    initMapUUID() {
      //载入地图，使用vuex保存状态
      this.uploadinfo.uuid=UUID.create(4).hex
    },
    changeStyle(){
      map.removeLayer(layers)
      this.$maputils.map.changeLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        // zoomOffset 注释掉会出大问题
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      })
    },
    addUserMarker(){
      this.editFtButton.placeUserPoint=!this.editFtButton.placeUserPoint
      // 放置两个按钮干扰
      if (this.editFtButton.placeDepotPoint){
        this.editFtButton.placeDepotPoint=!this.editFtButton.placeDepotPoint
      }
      let userIcon = this.$maputils.map.createIcon({
        iconUrl: require("../../../assets/icon/mobile.png"),
        iconSize: [36, 36]})
      map.on('click',(e)=>{
        if (!this.editFtButton.placeUserPoint){
          console.log("status:  "+this.editFtButton.placeUserPoint)
          return
        }
        let userStr = "user "+this.lineInfo.userLength
        let createStamp = new Date()
        this.inputUserLocation(userStr,createStamp,e)
        this.markers.users[this.lineInfo.userLength]=this.$maputils.map.createMarker(e.latlng,{icon:userIcon,title:userStr})
        this.lineInfo.userLength+=1
        layerGroup.userlayer = L.layerGroup(this.markers.users)
        layerGroup.userlayer.addTo(map)
      })
      if (!this.editFtButton.placeUserPoint){
        console.log("off")
        map.off('click')
      }
    },
    addDepotMarker(){
      this.editFtButton.placeDepotPoint=!this.editFtButton.placeDepotPoint
      // 防置两个干扰
      if(this.editFtButton.placeUserPoint){
        this.editFtButton.placeUserPoint=!this.editFtButton.placeUserPoint
      }
      if (this.markers.depot===null) {
        let depotIcon = this.$maputils.map.createIcon({
          iconUrl: require("../../../assets/icon/depot.png"),
          iconSize: [36, 36]
        })
        map.on('click', (e) => {
          if (!this.editFtButton.placeDepotPoint && this.markers.depot !== null) {
            console.log("status:  " + this.editFtButton.placeDepotPoint)
            return
          }
          let depotStr = "depot 0"
          let createStamp = new Date()
          this.inputUserLocation(depotStr,createStamp,e)
          this.markers.depot = this.$maputils.map.createMarker(e.latlng, {icon: depotIcon, title: depotStr}).addTo(map)
          layerGroup.depotlayer = L.layerGroup([this.markers.depot])
          layerGroup.depotlayer.addTo(map)
          if (this.markers.depot!==null){
            this.editFtButton.placeDepotPoint=!this.editFtButton.placeDepotPoint
            console.log(this.editFtButton.placeDepotPoint)
            map.off('click')
          }
        })
      }else {
        this.$message.warning("仓库已经放置过了")
        this.editFtButton.placeDepotPoint=!this.editFtButton.placeDepotPoint
        console.log(this.editFtButton.placeDepotPoint+"状态")
        map.off('click')
      }
      console.log(this.markers.depot)
    },
    resetMarkers(){
      if (layerGroup.depotlayer ===null && layerGroup.userlayer === null && layerGroup.linelayer === null){
        this.$message.warning("纯净状态")
        return
      }
      if (layerGroup.depotlayer !==null){
        layerGroup.depotlayer.remove()
      }
      if (layerGroup.userlayer !== null){
        layerGroup.userlayer.remove()
        layerGroup.userlayer=null
      }
      if (layerGroup.linelayer!== null){
        layerGroup.linelayer.remove()
        layerGroup.linelayer=null
      }
      this.editFtButton.uploadStatus=false
      // 两个路线数组置空
      this.lineInfo.pathline=[]
      this.lineInfo.backendLine=[]
      this.markers.users.length=0
      this.markers.users=[]
      this.markers.depot=null
    },
    // 输入参数中间函数
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
      userString.uuid=this.uploadinfo.uuid
      userString.createTime=createStamp
      // 上传用户信息
      that.uploadinfo.userinfo.push(userString)
      locationString.userid=userid
      locationString.uuid=this.uploadinfo.uuid
      locationString.serviceTime=createStamp
      locationString.status=false
      locationString.geoPoint.coordinates[0]=e.latlng.lat
      locationString.geoPoint.coordinates[1]=e.latlng.lng
      locationString.geoPoint.type="Point"
      // 上传位置信息
      that.uploadinfo.locationinfo.push(locationString)
    },
    async uploadAll() {
      if (this.uploadinfo.locationinfo.length === 0 || this.uploadinfo.userinfo.length === 0){
        this.$message.error("提交不完整")
        return
      }
      if (this.editFtButton.uploadStatus){
        this.$message.warning("请勿重复提交")
        return
      }
      const {data: resuser} = await this.$http.post('mobile/savemany', this.uploadinfo.userinfo)
      const {data: reslocate} = await this.$http.post('mobile/manylocations', this.uploadinfo.locationinfo)
      if (resuser.status===200 && reslocate.status===200){
        this.$message.success("推送成功")
        this.editFtButton.uploadStatus=!this.editFtButton.uploadStatus
      }else {
        this.$message.error("推送失败")
      }
      console.log(reslocate)
      console.log(resuser)
    },
    async planRoute() {
      let depots = await this.$http.get('mobile/findAll')
      if (this.markers.depot === null) {
      let userIcon = this.$maputils.map.createIcon({
        iconUrl: require("../../../assets/icon/mobile.png"),
        iconSize: [36, 36]})
        for (let i = 0; i < depots.data.length; i++) {
          // mobileId中是否包含user字段
          if (depots.data[i].mobileid.includes("user")) {
            let latlng = {}
            latlng.lat = depots.data[i].lat
            latlng.lng = depots.data[i].lng
            let userStr = "user " + this.lineInfo.userLength
            this.markers.users[this.lineInfo.userLength] = this.$maputils.map.createMarker(latlng, { icon: userIcon, title: userStr })
            this.lineInfo.userLength += 1
            layerGroup.userlayer = L.layerGroup(this.markers.users)
            layerGroup.userlayer.addTo(map)
          }
          if (depots.data[i].mobileid.includes("depot")) {
            let latlng = {}
            let depotIcon = this.$maputils.map.createIcon({
              iconUrl: require("../../../assets/icon/depot.png"),
              iconSize: [36, 36]
            })
            latlng.lat = depots.data[i].lat
            latlng.lng = depots.data[i].lng
            let depotStr = "depot 0"
            this.markers.users[this.lineInfo.userLength] = this.$maputils.map.createMarker(latlng, { icon: depotIcon, title: depotStr })
            this.lineInfo.userLength += 1
            layerGroup.userlayer = L.layerGroup(this.markers.users)
            layerGroup.userlayer.addTo(map)
          }
        }
      }
      if (this.editFtButton.vehicleNumber === null){
        this.$message.warning("必须提供无人机数量")
        return
      }
      let uuid = null
      console.log(this.editFtButton.uuid)
      if (this.editFtButton.uuid !== null){
        const {data:existuuid} = await this.$http.post('mobile/existuuid',qs.stringify({uuid:this.editFtButton.uuid}))
        // 返回的是字符串
        if (existuuid.status === '200'){
          uuid = this.editFtButton.uuid
        }else {
          const {data: res} = await this.$http.get('/mobile/findlastuuid')
          if (res.status !== 200){
            this.$message.error("当前不存在任何用户")
            return
          }
          uuid = res.results
        }
      }else {
        const {data: res} = await this.$http.get('/mobile/findlastuuid')
        if (res.status !== 200){
          this.$message.error("当前不存在任何用户")
          return
        }
        uuid = res.results
      }
      const {data:resLocation} =await this.$http.post('compute/saveAllLocation', qs.stringify({uuid:uuid}))
      console.log("保存用户")
      console.log(resLocation)
      const {data:resPlan} =await this.$http.post('compute/findStaticRoutes',qs.stringify({vehicleNum:this.editFtButton.vehicleNumber}))
      console.log(resPlan)
      if (resPlan.status !== 200){
        this.$message.error(resPlan.msg)
      }else {
        this.$message.success(resPlan.msg)
        /*
        转换为数组类型
         */
        this.lineInfo.backendLine = Object.values(resPlan.results)
        // vuex状态管理路线信息
        this.storeUavRouteInfo(resPlan.results)
        console.log(this.lineInfo.backendLine)
        console.log(resPlan)
      }
    },
    drawPathLine(){
      for(let i = 0;i<this.lineInfo.backendLine.length-1;i++){
        let locationArray = []
        for (let j=0;j<this.lineInfo.backendLine[i].length;j++){
          locationArray.push(this.lineInfo.backendLine[i][j].location)
        }
        this.lineInfo.pathline.push(locationArray)
      }
      let colorPathSet = ['#00bd01','#008080','#BDB76B','#DAA520','#FF7F50','#BC8F8F','#48D1CC','#87CEFA','#9400D3']
      layerGroup.linelayer = L.layerGroup().addTo(map)
      for (let i=0;i<this.lineInfo.pathline.length;i++){
        this.lineInfo.drawlineState[i] = L.polyline(this.lineInfo.pathline[i],{weight: 8, color: colorPathSet[i]}).addTo(layerGroup.linelayer)
        // L.layerGroup(this.lineInfo.drawlineState[i]).addLayer(layerGroup.linelayer)
        L.polylineDecorator(this.lineInfo.drawlineState[i], {
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
        }).addTo(layerGroup.linelayer)
      }
      // 绘制飞行无人机
      this.drawUAV()
    },
    drawUAV(){
      let uavIcon = this.$maputils.map.createIcon({
        iconUrl: require("../../../assets/icon/uav48.svg"),
        iconSize: [36, 36]})
      this.lineInfo.marker = new Array(this.lineInfo.pathline.length)
      for(let i=0;i<this.lineInfo.pathline.length;i++){
        // let flyingSpeed = [];
        let flyingSpeed =new Array(this.lineInfo.pathline[i].length)
        for (let j=0;j<this.lineInfo.pathline[i].length;j++){
          flyingSpeed[j] = 1000;
        }
        this.lineInfo.marker[i] = L.Marker.movingMarker(this.lineInfo.pathline[i],flyingSpeed,{icon:uavIcon}).addTo(map);
        this.lineInfo.marker[i].bindPopup("无人机<b>"+i+"</b>的路线",{autoClose:false,closeOnClick: false}).openPopup();
      }
    },
    animateUAV(){
      for (let uavIndex=0;uavIndex<this.lineInfo.marker.length;uavIndex++){
        this.lineInfo.marker[uavIndex].start()
      }
    },
    // 绘制已行走轨迹线（橙色那条）
    updateRealLine() {
      // newLatlngs.push(latlng)
      // realRouteLine.setLatLngs(newLatlngs)
    }
  }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 0;
  /*background-color: #409EFF;*/
}
#mapsetting{
  height: 100%;
}
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
