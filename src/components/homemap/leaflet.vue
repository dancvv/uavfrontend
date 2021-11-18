<template>
  <div id="mapsetting">
    <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group>
<!--    <map-component></map-component>-->
<!--    <editandplan></editandplan>-->
    <buttonpage :editFtButton="editFtButton" @resetAllMarker="resetMarkers" @placeUser="addUserMarker" @placeDepot="addDepotMarker" @pushAll="uploadAll"></buttonpage>
    <mission-start></mission-start>
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {mapMutations} from "vuex";
import MissionStart from "@/components/homemap/missionStart";
import buttonpage from "@/components/homemap/buttonpage";
import UUID from "uuid-js"
let map=null
let layerGroup={
  userlayer:null,
  depotlayer:null,
}
let layers = null
export default {
  name: "leaflet",
  components: { MissionStart ,buttonpage},
  data(){
    return{
      // map:''
      // 地图类型
      mapId:'mapbox/streets-v11',
      editFtButton:{
        placeUserPoint:false,
        placeDepotPoint:false
      },
      layersSet:{
        markerSet:null,
      },
      markerSet:{
        userLength:0
      },
      markers:{
        users:[],
        depot:null,
      },
      // 用户信息和用户位置信息
      uploadinfo:{
        uuid:null,
        userinfo:[],
        locationinfo:[]
      },
    }
  },
  mounted() {
    map = this.$maputils.map.newMap("map",{
      minZoom: 0,
      maxZoom: 20,
      zoomControl: false,
      attributionControl: false,
      //坐标系选择
      crs: L.CRS.EPSG3857
    })
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
    map.setView([ 39.082324815761126,121.81149363525782],16)
    this.layersSet.markerSet=L.layerGroup().addTo(map)
  },
  created() {
    this.initMap()
  },
  methods:{
    ...mapMutations(['initleaflet']),
    initMap() {
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
      let uavIcon = this.$maputils.map.createIcon({
        iconUrl: require("../../assets/icon/mobile.png"),
        iconSize: [36, 36]})
      map.on('click',(e)=>{
        if (!this.editFtButton.placeUserPoint){
          console.log("status:  "+this.editFtButton.placeUserPoint)
          return
        }
        let userStr = "user "+this.markerSet.userLength
        let createStamp = new Date()
        this.inputUserLocation(userStr,createStamp,e)
        this.markers.users[this.markerSet.userLength]=this.$maputils.map.createMarker(e.latlng,{icon:uavIcon,title:userStr})
        this.markerSet.userLength+=1
        layerGroup.userlayer = L.layerGroup(this.markers.users)
        layerGroup.userlayer.addTo(map)
      })
      if (!this.editFtButton.placeUserPoint){
        console.log("off")
        map.off()
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
          iconUrl: require("../../assets/icon/depot.svg"),
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
          this.markers.depot = this.$maputils.map.createMarker(e.latlng, {icon: depotIcon, title: depotStr})
          layerGroup.depotlayer = L.layerGroup([this.markers.depot])
          layerGroup.depotlayer.addTo(map)
          if (this.markers.depot!==null){
            this.editFtButton.placeDepotPoint=!this.editFtButton.placeDepotPoint
            console.log(this.editFtButton.placeDepotPoint)
            map.off()
          }
        })
      }else {
        this.$message.warning("仓库已经放置过了")
        this.editFtButton.placeDepotPoint=!this.editFtButton.placeDepotPoint
        console.log(this.editFtButton.placeDepotPoint)
        map.off()
      }
      console.log(this.markers.depot)
    },
    resetMarkers(){
      if (layerGroup.depotlayer ===null && layerGroup.userlayer === null){
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
      this.markers.users.length=0
      this.markers.users=[]
      this.markers.depot=null
      map.off()
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
      locationString.serviceTime=createStamp
      locationString.status=false
      locationString.geoPoint.coordinates[0]=e.latlng.lat
      locationString.geoPoint.coordinates[1]=e.latlng.lng
      locationString.geoPoint.type="Point"
      // 上传位置信息
      that.uploadinfo.locationinfo.push(locationString)
    },
    async uploadAll() {
      const {data: resuser} = await this.$http.post('mobile/savemany', this.uploadinfo.userinfo)
      const {data: reslocate} = await this.$http.post('mobile/manylocations', this.uploadinfo.locationinfo)
      if (resuser.status===200 && reslocate.status===200){
        this.$message.success("推送成功")
      }else {
        this.$message.error("推送失败")
      }
      console.log(reslocate)
      console.log(resuser)
    },

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
