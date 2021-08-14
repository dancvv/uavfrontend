<template>
<div id="local">


<!--地图类型选项存在导入位图  :map-style="style"-->
      <baidu-map class="map" :center="center" :zoom="zoomLevel" :scroll-wheel-zoom="true" :map-type="mapType"  @mousemove="syncPolyline"
                 @click="paintPolyline"
                 @rightclick="newPolyline">
        <bm-control>
          <el-row type="flex" class="row-bg">
            <el-col>
              <el-radio-group v-model="mapType">
                <el-radio-button label="BMAP_NORMAL_MAP" size="medium">2D地图</el-radio-button>
                <el-radio-button label="BMAP_SATELLITE_MAP" size="medium">卫星地图</el-radio-button>
<!--                <el-radio-button label="3D地图" size="medium"></el-radio-button>-->
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="success" @click="clickChange">改变icon</el-button>
            <el-button type="success" @click="clickDraw">开始绘制</el-button>
            <el-button type="success" @click="handler">清除路线</el-button>
            <el-button type="primary" @click="toggle('polyline')">{{polyline.editing?'停止绘制':'开始绘制'}}</el-button>
            <el-card v-show="cardVisible">
              <h3>参数设置</h3>
              无人机编号：<el-input v-model="uavConfig.serialNum"></el-input><br>
              经度：<el-input v-model="uavConfig.lng">{{uavConfig.lng}}</el-input><br>
              纬度：<el-input v-model="uavConfig.lat">{{uavConfig.lat}}</el-input><br>
              <el-button @click="cardVisible = false">取 消</el-button>
              <el-button type="primary" @click="editConfirm">确 定</el-button>
            </el-card>
          </el-row>
        </bm-control>
<!--        定位  -->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
<!--        图标区-->
        <bm-marker :position="pos" :icon="UavIcon" @click="onHand" :dragging="dragMarker" v-if="showMarker"></bm-marker>
        <bm-marker v-for="(item,index) in pos1" :key="index" :position="item" :dragging="dragMarker" :icon="UavIcon" @click="onHand"></bm-marker>
<!--        绘制路线-->
        <bm-polyline stroke-color="#28F" :stroke-opacity="0.5" :stroke-weight="6" :path="path" v-for="(path,index) of polyline.paths" :key="index" :editing="polyline.editing"></bm-polyline>

      </baidu-map>

</div>


</template>

<script>
import mapstyle from "/src/assets/style/custom_map_config.json"
export default {
  name: "BAIDUmap",
  data(){
    return{
      //百度地图样式
      editing:true,
      //是否展示marker
      showMarker:true,
      baiduMapstyle:{
        featrues:Array,
        style:mapstyle,
      },
      zoomLevel:16,
      //无人机参数设置
      uavConfig:{
        serialNum:'',
        lng:'',
        lat:''
      },
      pos:{lng: 121.83206, lat: 39.084716},
      //地图中心点
      center:{lng: 121.83206, lat: 39.084716},
      //绘制无人机路线
      polyline:{
        editing:false,
        paths:[]
      },
      pos1:[
        {lng: 121.81206, lat: 39.084716},
        {lng: 121.83065, lat: 39.084616},
        {lng: 121.85406, lat: 39.084516},
        {lng: 121.81506, lat: 39.084416},
      ],
      UavIcon:{
        url:require('/public/uav48.svg'),
        size: {width: 48, height: 48}
      },
    //  地图类型选项
      mapType:"BMAP_NORMAL_MAP",
    //  卡片窗口设置
      cardVisible:false,
    //  图标拖拽
      dragMarker:false,
    }
  },
  created() {

  },
  methods:{
    //获取无人机的位置
    onHand(e){
      this.cardVisible=true
      this.dragMarker=true
      const{lng,lat}=e.target.point
      this.uavConfig.lng=lng
      this.uavConfig.lat=lat
      this.$message.success("成功推送")
    },
    editConfirm(){
      this.pos.lng=this.uavConfig.lng
      this.pos.lat=this.uavConfig.lat
      this.dragMarker=false
      this.cardVisible=false
    },
    clickChange(){
      for(let i=0; i<20; i++){

        setTimeout(()=>{
          this.pos.lng=this.pos.lng+0.0001
          this.pos.lat=this.pos.lat+0.0001
        },1000)
      }
    },
    handler(){
      // let point = new BMap.Point(121.81606, 39.08516);
      // var marker=new BMap.marker(point)
      // map.addOverlay(marker)
      console.log("清除成功")
      this.pos={}
      this.pos1=[]
      this.showMarker=false
      console.log(this.pos)
      console.log(this.showMarker)
    },
    clickDraw(){
      this.pos1.pop()
      this.showMarker=true
    },
  //  toggle button 按钮事件
    toggle(name){
      this[name].editing=!this[name].editing
    },
    syncPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      // console.log(e)
      const {paths} = this.polyline
      // console.log(paths.length)
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    newPolyline () {
      if (!this.polyline.editing) {
        return
      }
      // const {paths} = this.polyline
      // if(!paths.length) {
      //   paths.push([])
      // }
      // const path = paths[paths.length - 1]
      // path.pop()
      // if (path.length) {
      //   paths.push([])
      // }
    },
    paintPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      //解构赋值
      const {paths} = this.polyline
      console.log(paths.length)
      //判断该点
      !paths.length && paths.push([])
      //推入点
      paths[paths.length - 1].push(e.point)
    }
  }
}
</script>

<style scoped>
#local{
  height: 100%;
  background-color: palevioletred;
}
.map {
  width: 100%;
  height: 100%;
}
.el-row{
  margin-top: 10px;
  padding: 20px;
}
</style>
