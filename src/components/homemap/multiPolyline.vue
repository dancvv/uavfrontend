<template>
<el-card>
  <el-button @click="drawPath">使用</el-button>
  <el-button @click="testPath">装饰</el-button>
</el-card>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import L from "leaflet";
import "leaflet-polylinedecorator"

export default {
  name: "multiPolyline",
  data(){
    return{
      planningLine:{
        editing:false,
        paths:[],
        planningRoute:{}
      },
      multiLine:[],
      polyline:''
    }
  },
  computed:{
    ...mapState(['leafletMap','uavPlanningRoutes','leafletLine'])
  },
  methods:{
    ...mapMutations(['storeMultiLine']),
    drawPath(){
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
      // 把路线存入vuex，从vuex取得唯一地图函数
      this.storeMultiLine(L.polyline(this.multiLine, {color: 'green'}).addTo(mapLeaf))
      this.polyline = this.leafletLine

      mapLeaf.fitBounds(this.polyline.getBounds())
      L.polylineDecorator(this.polyline, {
        patterns: [
          {offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({
              pixelSize: 5,
              headAngle: 75,
              polygon: false,
              pathOptions: {
                stroke: true,
                weight: 2,
                color: '#FFFFFF'
              }
            })}
        ]
      }).addTo(mapLeaf);
    },
    testPath(){
    }
  }
}
</script>

<style scoped>
.el-card{
  z-index: 1;
  position: absolute;
  bottom: 20%;
  right: 10%;
}
</style>
