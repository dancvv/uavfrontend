<template>
<div id="mission-group">
  <el-button type="success" @click="startUav">无人机起飞</el-button>
  <el-button type="primary" @click="position">+</el-button>
</div>
</template>

<script>
import {mapState} from "vuex";
import L from 'leaflet'
// 导入动态动画库
import "../../assets/jsplugin/MovingMarker"
let UavIcon = L.Icon.extend({
  options: {
    iconSize:     [48, 48],
    shadowSize:   [0, 0],
    iconAnchor:   [24, 48],
    // popupAnchor:  [24, 48]
  }
});
let uavIcon=new UavIcon({iconUrl: '/leaflet/uav48.svg'})
let uavmar=null
export default {
  name: "missionStart",
  data(){
    return{
      // 全局地图
      mapLeaf:null,
      // 测试数据
      data:null,
    }
  },
  computed:{
    ...mapState(['leafletMap','uavPlanningRoutes'])
  },

  methods:{
    startUav(){
      const mapLeaf=this.leafletMap
      console.log(this.uavPlanningRoutes.routeMapLocation.get(0))
      let uav0=this.uavPlanningRoutes.routeMapLocation.get(0)
      for (let i=0;i<uav0.length;i++){
        delete uav0[i].id
      }
      this.data=uav0[0]
      console.log(this.data)
      mapLeaf.on('click',()=>{
        // console.log(e.latlng)
        L.Marker.movingMarker(uav0,[3000,3000,3000,3000,3000],{autostart: true}).addTo(mapLeaf)
        uavmar=L.marker([39.07962435001801, 121.81003332138063],{icon:uavIcon}).addTo(mapLeaf)
      })
    },
  //  改变方向
    position(){
      this.data.lat=this.data.lat+0.0001
      this.data.lng=this.data.lng+0.0001
      // 实现实时定位的方法，不停的设置无人机经纬度坐标
      uavmar.setLatLng(this.data)
      console.log(this.data)
    }
  }
}
</script>

<style scoped>
#mission-group{
  position: absolute;
  z-index: 1;
  right: 5%;
  bottom: 25px;
}

</style>
