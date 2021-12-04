<template>
<div id="mission-group">
  <el-button type="success" @click="animateTraj">路线演示</el-button>
  <el-button type="primary" @click="positions">+</el-button>
</div>
</template>

<script>
import {mapState} from "vuex";
import L from 'leaflet'
// 导入marker动画插件
import "../../assets/jsplugin/AnimatedMarker"
import 'leaflet.animatedmarker/src/AnimatedMarker'
let UavIcon = L.Icon.extend({
  options: {
    iconSize:     [48, 48],
    shadowSize:   [0, 0],
    iconAnchor:   [24, 24],
  }
});
let uavIcon=new UavIcon({iconUrl: '/leaflet/uav48.svg'})
// let newLatlngs = [routeLine.getLatLngs()[0]]
// let uavmar=null
export default {
  name: "missionStart",
  props:["lineInfo"],
  data(){
    return{
      // 全局地图
      mapLeaf:null,
      // 测试数据
      data:null,
      animate:[],
    }
  },
  computed:{
    ...mapState(['leafletMap','uavPlanningRoutes','leafletLine'])
  },

  methods:{
    animate2(){
      const mapLeaf=this.leafletMap
      console.log(this.uavPlanningRoutes.originLine)
      let uav0=this.uavPlanningRoutes.originLine[0]
      for (let i=0;i<uav0.length;i++){
        delete uav0[i].id
      }
      this.data=uav0[0]
      console.log(uav0)
      // console.log(this.leafletLine.getLatLngs())
      for (let i=0;i<this.uavPlanningRoutes.originLine.length;i++){
        this.animate[i]=L.animatedMarker(this.uavPlanningRoutes.originLine[i],{icon:uavIcon,interval:3000,zIndexOffset:1}).addTo(mapLeaf)
        console.log(i)
        let string = "无人机 "+i+" 的路线"
        this.animate[i].bindTooltip(string).openTooltip()
      }
      // this.animate=L.animatedMarker(uav0,{icon:uavIcon,interval:3000}).addTo(mapLeaf)
    },
    animateTraj(){
      // let uavFlyIcon = this.$maputils.map.createIcon({
      //   iconUrl:require("../../assets/icon/uav48.svg"),
      //   iconSize: [36,36]
      // })
      this.$emit("animateMarkers")
      // console.log(this.lineInfo.pathline)
      // for (let i=0;i<this.lineInfo.pathline.length;i++){
      //   this.animate[i]=L.animatedMarker(this.lineInfo.pathline[i],{
      //     icon:uavFlyIcon,
      //     playCall: this.updateRealLine
      //   }).addTo(map)
      },
      positions(){}
    },
    // updateRealLine(latlng){
    //   // newLatlngs.push(latlng)
    //   // realRouteLine.setLatLngs(newLatlngs)
    // },
  //  改变方向
  // }
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
