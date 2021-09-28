<template>
<div id="mission-group">
  <el-button type="success" @click="startUav">无人机起飞</el-button>
  <el-button type="primary" @click="position">+</el-button>
</div>
</template>

<script>
import {mapState} from "vuex";
import L from 'leaflet'
// 导入marker动画插件
import 'leaflet.animatedmarker/src/AnimatedMarker'
// 导入动态动画库
// import "../../assets/jsplugin/MovingMarker"
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
      animateMarker:null,
    }
  },
  computed:{
    ...mapState(['leafletMap','uavPlanningRoutes','leafletLine'])
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
      console.log(uav0)
      console.log(this.leafletLine.getLatLngs())

      this.animateMarker=L.animatedMarker(uav0,{icon:uavIcon,interval:3000}).addTo(mapLeaf)


    },
  //  改变方向
    position(){
      this.animateMarker.start()
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
