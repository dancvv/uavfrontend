<template>
    <div id="mapsetting">
    <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group>
    <el-button class="mapStyle2" type="success" size="mini" @click="visualMap">可视化</el-button>
    <el-button class="mapStyle2" style="margin-top: 60px; margin-left: 520px;" type="success" size="mini" @click="getClusterLocation">聚类方法</el-button>
        <datepicker></datepicker>
<!--    <map-component></map-component>-->
<!--    <editandplan></editandplan>-->
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.css'
// 大规模数据展示插件
import 'leaflet-markers-canvas'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import datepicker from './datepicker.vue'
let map=null
let layers = null
export default {
  components: { datepicker },
    data(){
        return{
            mapId:'mapbox/streets-v11',
            geoLocate:null,
            // 原始信息
            userLocation:[],
            canvasMarkers: [],
            // 聚类点
            clusterLocation:[]
        }
    },
    mounted() {
    // 初始化地图
      this.mapInitialize();
      // 定位
      this.geoLocate.start();
    },
    methods:{
     mapInitialize(){
      map = this.$maputils.map.newMap("map",{
        minZoom: 1,
        maxZoom: 20,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      }).fitWorld();
      layers = this.$maputils.map.createLayers(map,'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: this.mapId,
        tileSize: 512,
        zoomOffset: -1,
        // preferCanvas: true,
        accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
      })
      L.control.zoom({position:'topright'}).addTo(map)
      L.control.attribution({
        position:'bottomright',
        prefix:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}).addTo(map)
      // 定位功能，旧版，废弃
      // this.locateYou();
      //初始化绘制控件
      // var drawnItems = new L.FeatureGroup();
      //     map.addLayer(drawnItems);
      //     var drawControl = new L.Control.Draw({
      //         edit: {
      //             featureGroup: drawnItems
      //         }
      //     });
      // map.addControl(drawControl);
     //  定位功能，可用
      this.geoLocate = L.control.locate({position:'bottomright',initialZoomLevel:15}).addTo(map);
    },
    // 大规模数据显示示例函数
    visualMapDemo(){
      var markersCanvas = new L.MarkersCanvas();
      markersCanvas.addTo(map);
      var markers = [];
      for (var i = 0; i < 10000; i++) {
        var marker = L.marker([39.083118 + Math.random() * 1.8, 121.808749 + Math.random() * 3.6],).bindPopup("I Am " + i)
        markers.push(marker);
    }
      markersCanvas.addMarkers(markers);
      this.$notify.success({
            title:'查询后端数据库',
            message:'返回结果成功'
          })
    },
    // 数据显示函数
    visualMap(){
      this.getUserData()
      var markersCanvas = new L.MarkersCanvas();
      markersCanvas.addTo(map);
      for (var i = 0; i < this.userLocation.length; i++) {
        console.log(this.userLocation[i])
        var marker = L.marker([this.userLocation[i].latitude, this.userLocation[i].longitude]).bindPopup("用户ID： " + this.userLocation[i].userId).on({
      mouseover() {
        this.openPopup();
      },
      mouseout() {
        this.closePopup();
      },})
        this.canvasMarkers.push(marker);
    }
      markersCanvas.addMarkers(this.canvasMarkers);
      let bounds = markersCanvas.getBounds()
      // console.log(bounds)
      map.fitBounds(bounds)
      
      
    },
    // 获取数据源
    async getUserData(){
      const{data:response}=await this.$http.get('taxiuser/getLocation')
      if(response.length===0){
        return
      }
      for(let i = 0;i<response.length;i++){
        this.userLocation.push(response[i])
      }
      this.$notify.success({
            title:'查询后端数据库',
            message:'返回结果成功，'+'请求到'+response.length+'条数据'
          })
    },
    // 定位函数，显示定位成功与否
    locateYou(){
      map.on('locationfound',this.onLocationFound)
      map.on('locationerror',this.onLocationError)
      map.locate({setView:true,maxZoom:15})
    },
    onLocationFound(e){
      console.log(e)
      let radius=e.accuracy/2;
      let userMarker=L.marker(e.latlng).bindPopup('当前定位精度:'+radius+'m').openPopup()
      let userCircle=L.circle(e.latlng,radius)
      let locateGroup=L.layerGroup([userMarker,userCircle])
      locateGroup.addTo(map)
    },
    onLocationError(e){
      this.$message.error(e.message)
    },
    // 改变地图样式
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
    clusterMarker(){
    },
    async getClusterLocation(){
      const {data : res} = await this.$http.get('cluster/findall')
      this.clusterLocation = res
      console.log(res)
      this.$notify.success({
        title:'聚类结果',
        message:'聚类成功，'+'聚类中心'+res.length+'个'
      })
      this.ClusterShow()
    },
    ClusterShow(){
      // this.getUserData()
      var markersCanvas = new L.MarkersCanvas();
      markersCanvas.addTo(map);
      for (var i = 0; i < this.clusterLocation.length; i++) {
        console.log(this.clusterLocation[i])
        var marker = L.marker([this.clusterLocation[i].lat, this.clusterLocation[i].lng]).bindPopup("用户ID： " + this.userLocation[i].id).on({
          mouseover() {
            this.openPopup();
          },
          mouseout() {
            this.closePopup();
          },})
        this.canvasMarkers.push(marker);
    }
      markersCanvas.addMarkers(this.canvasMarkers);
      let bounds = markersCanvas.getBounds()
      // console.log(bounds)
      map.fitBounds(bounds)
    }
  },
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 0;
  background: bisque;
  /*background-color: #409EFF;*/
}
#mapsetting{
  height: 100%;
  background: whitesmoke;
}
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
}
.target{
  font-size: 1.5em;
} 
.mapStyle2{
  position: absolute;
  z-index: 1;
  margin-top: 60px;
  margin-left: 450px;
}
.row{
  position: absolute;
  margin-top: 60px;
  z-index:10;
  margin-left: 20px;
}
.col{
  z-index:10;
}
</style>